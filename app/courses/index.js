import { burrinessCourse, burrinessTitle } from "./burrinessCourse";
import { fricativesCourse, fricativesTitle } from "./fricativesCourse";

//собираем информацию о курсах в один файл для удобства использования в других частях программы

export const courses = {
  burriness: {
    course: burrinessCourse,
    title: burrinessTitle,
    length: burrinessCourse.length,
  },
  fricatives: {
    course: fricativesCourse,
    title: fricativesTitle,
    length: fricativesCourse.length,
  },

};