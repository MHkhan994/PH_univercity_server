import catchAsync from '../../utils/catchAsync'

const createAcademicSemester = catchAsync(async (req, res) => {
  console.log(req)
})

export const AcademicSemisterControllers = {
  createAcademicSemester,
}
