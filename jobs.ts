import { JobItemProps } from "./components/jobItem";

import govalo from "./public/govalo.png";
import cruise from "./public/cruise.png";
import unity from "./public/unity.png";
import idean from "./public/idean.png";
import euclid from "./public/euclid-wework.png";
import walmart from "./public/walmart.png";
import dell from "./public/dell.png";

const jobs: JobItemProps[] = [
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
    company: "Idean, Inc (now frog)",
    role: "Senior UI Developer (Contract)",
    startDate: "Oct 2016",
    endDate: "May 2017",
    img: idean,
  },
  {
    company: "Euclid Analytics (acq. by WeWork)",
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
    role: "Software Development Staff Engineer",
    startDate: "Apr 2011",
    endDate: "Mar 2015",
    img: dell,
  },
];

export default jobs;
