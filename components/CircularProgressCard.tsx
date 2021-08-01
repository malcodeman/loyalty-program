import {
  Text,
  CircularProgress,
  CircularProgressLabel,
  SkeletonText,
} from "@chakra-ui/react";

import utils from "../lib/utils";
import constants from "../lib/constants";

type props = {
  startDate: Date;
  isLoading: boolean;
};

function CircularProgressCard(props: props) {
  const { startDate, isLoading } = props;
  const currentProgress = utils.getCurrentProgress(startDate);
  const nextLevel = utils.getNextLevel(startDate);
  const currentProgressPercentage = utils
    .getPercentage(currentProgress.value, currentProgress.max)
    .toFixed(1);
  const level = utils.getLevel(startDate);
  const isMaxLevel = level === constants.LEVELS[4];

  function renderProgressLabel() {
    if (isLoading) {
      return "";
    } else if (isMaxLevel) {
      return "100%";
    }
    return `${currentProgressPercentage}%`;
  }

  function renderProgressText() {
    if (isLoading) {
      return (
        <>
          <SkeletonText noOfLines={1} width="128px" mb="2" />
          <SkeletonText noOfLines={2} width="164px" />
        </>
      );
    } else if (isMaxLevel) {
      return <></>;
    }
    return (
      <>
        <Text>Your Current Progress</Text>
        <Text fontSize="sm">
          {currentProgress.value} / {currentProgress.max} months until level{" "}
          {nextLevel}
        </Text>
      </>
    );
  }

  return (
    <>
      <CircularProgress
        value={isMaxLevel ? 100 : currentProgress.value}
        max={isMaxLevel ? 100 : currentProgress.max}
        isIndeterminate={isLoading}
        size="164px"
      >
        <CircularProgressLabel>{renderProgressLabel()}</CircularProgressLabel>
      </CircularProgress>
      {renderProgressText()}
    </>
  );
}

export default CircularProgressCard;
