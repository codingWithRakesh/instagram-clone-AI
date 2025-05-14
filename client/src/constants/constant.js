import profile from '../assets/images/profile.jpeg';
import video from '../assets/videos/video2.mp4'
import video3 from '../assets/videos/video3.mp4'
export const stories = [
    {
        url: profile,
        duration: 5000,

    },
    {
        url: video,
        type: 'video',
        duration: 10000,

    },
    {
        url: profile,
        duration: 5000,

    },
    {
        url: video3,
        type: 'video',
        duration: 10000,

    },
];

export const userStory = [
    {
        userName: "rakesh_23",
        profile: profile,
        stories: [
            {
                url: profile,
                duration: 5000,
                time: "7h",

            },
            {
                url: video,
                type: 'video',
                duration: 10000,
                time: "2h",

            },
            {
                url: profile,
                duration: 5000,
                time: "5m",

            },
            {
                url: video3,
                type: 'video',
                duration: 10000,
                time: "7h",
            },
        ]
    }
];

export function shortenText(text) {
  if (text.length > 10) {
    return text.slice(0, 9) + '...';
  } else {
    return text;
  }
}