import { JobItemProps } from "./src/components/JobItem";

import heyday from "./public/heyday.png";
import govalo from "./public/govalo.png";
import cruise from "./public/cruise.png";
import unity from "./public/unity.png";
import idean from "./public/idean.png";
import euclid from "./public/euclid-wework.png";
import walmart from "./public/walmart.png";
import dell from "./public/dell.png";

const jobs: JobItemProps[] = [
  {
    company: "Heyday",
    role: "Senior Software Engineer",
    startDate: "Jan 2023",
    endDate: "now",
    img: heyday,
  },
  {
    company: "Govalo",
    role: "Senior Fullstack Engineer",
    startDate: "Nov 2021",
    endDate: "Aug 2022",
    img: govalo,
  },
  {
    company: "Cruise Automation",
    role: "Senior Fullstack Engineer",
    startDate: "Oct 2018",
    endDate: "May 2019",
    img: cruise,
  },
  {
    company: "Unity Technologies",
    role: "Fullstack Engineer",
    startDate: "Oct 2017",
    endDate: "May 2018",
    img: unity,
  },
  {
    company: "Idean, Inc",
    extraInfo: "now frog",
    role: "Senior UI Developer (Contract)",
    startDate: "Oct 2016",
    endDate: "May 2017",
    img: idean,
  },
  {
    company: "Euclid Analytics",
    extraInfo: "acq. by WeWork",
    role: "Software Engineer",
    startDate: "Feb 2016",
    endDate: "Sep 2016",
    img: euclid,
  },
  {
    company: "Walmart Labs",
    role: "Senior Mobile Web Engineer",
    startDate: "Apr 2015",
    endDate: "Oct 2015",
    img: walmart,
  },
  {
    company: "Dell",
    role: "Software Development Engineer",
    startDate: "Apr 2011",
    endDate: "Mar 2015",
    img: dell,
  },
];

export default jobs;
