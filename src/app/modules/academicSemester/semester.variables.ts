import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
} from './semester.interface'

export const semesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
]

export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterNameCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
}

export const semesterCode: TAcademicSemesterCode[] = ['01', '02', '03']
