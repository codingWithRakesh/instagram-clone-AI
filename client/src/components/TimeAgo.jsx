import React from "react";

const TimeAgo = ({ date }) => {
  const getTimeAgo = (dateString) => {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffInMs = now - inputDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInYears = now.getUTCFullYear() - inputDate.getUTCFullYear();

    const isToday =
      now.getUTCFullYear() === inputDate.getUTCFullYear() &&
      now.getUTCMonth() === inputDate.getUTCMonth() &&
      now.getUTCDate() === inputDate.getUTCDate();

    if (isToday) {
      return "Today";
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInYears >= 1) {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }
  };

  return <span>{getTimeAgo(date)}</span>;
};

export default TimeAgo;
