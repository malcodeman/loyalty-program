import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import {
  useToast,
  Button,
  FormControl,
  FormLabel,
  ModalCloseButton,
  ModalOverlay,
  Select,
  Textarea,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as R from "ramda";
import { useSession } from "next-auth/client";

import constants from "../lib/constants";

import useAchievements from "../hooks/useAchievements";
import useUser from "../hooks/useUser";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

function RequestCoinModal(props: props) {
  const { isOpen, onClose } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { data: achievements, isLoading: isLoadingAchievements } =
    useAchievements();
  const { data: user } = useUser();
  const [session] = useSession();
  const toast = useToast();

  async function onSubmit(data: {
    achievementId: string;
    description: string;
  }) {
    const body = {
      databaseId: constants.NOTION_DATABASE_ID_REQUESTS,
      properties: {
        email: {
          title: [
            {
              text: {
                content: session?.user?.email,
              },
            },
          ],
        },
        description: {
          rich_text: [
            {
              text: {
                content: data.description,
              },
            },
          ],
        },
        status: {
          select: {
            name: "Pending",
          },
        },
        user: {
          relation: [{ id: user?.id }],
        },
        achievement: {
          relation: [{ id: data.achievementId }],
        },
      },
    };
    try {
      setIsLoading(true);
      await axios.post(`/api/pages`, body);
      toast({
        description: "Coins requested!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch {
      toast({
        description: "Something went wrong, please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      reset();
      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Request coins</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="2">
              <FormLabel>Achievement</FormLabel>
              <Select
                {...register("achievementId")}
                isDisabled={isLoadingAchievements}
              >
                {R.map((item) => {
                  const id = item.id;
                  const name = item.properties.name.title[0].plain_text;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                }, achievements.results)}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>
                Description -{" "}
                <Text as="span" fontStyle="italic">
                  Optional
                </Text>
              </FormLabel>
              <Textarea {...register("description")} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default RequestCoinModal;
