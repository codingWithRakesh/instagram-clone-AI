import React from "react";

const TimeAgo = ({ date }) => {
  const getTimeAgo = (dateString) => {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now - inputDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 52) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInWeeks / 52);
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  };

  return <span>{getTimeAgo(date)}</span>;
};

export default TimeAgo;
