import { Text, Avatar, Progress, ProgressLabel } from "@chakra-ui/react";
import { format } from "date-fns";

import utils from "../lib/utils";
import constants from "../lib/constants";

type props = {
  startDate: Date;
  name: string;
  avatarImage: string;
  isLoading: boolean;
};

const totalProgressMax = 7;

function ProfileCard(props: props) {
  const { startDate, name, avatarImage, isLoading } = props;
  const formatedStartDate = format(startDate, "MMM d, yyyy");
  const level = utils.getLevel(startDate);
  const totalProgress = utils.getTotalProgress(startDate);
  const isMaxLevel = level === constants.LEVELS[4];

  return (
    <>
      <Avatar size="2xl" mb="2" name={name} src={avatarImage} />
      <Text>
        {name} - {level}
      </Text>
      <Text fontSize="sm" mb="4">
        Joined {formatedStartDate}
      </Text>
      {isMaxLevel ? (
        <>
          <Text>Congrats, you have reached maximum level</Text>
        </>
      ) : (
        <Progress
          value={totalProgress}
          max={totalProgressMax}
          isIndeterminate={isLoading}
          size="lg"
          borderRadius="md"
        >
          {isLoading ? (
            <></>
          ) : (
            <ProgressLabel fontSize="sm">
              {totalProgress} / {totalProgressMax} years
            </ProgressLabel>
          )}
        </Progress>
      )}
    </>
  );
}

export default ProfileCard;
