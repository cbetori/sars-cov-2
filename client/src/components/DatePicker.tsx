//This is required by Antd to avoid moment which was adding to bundle size.

import { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker from 'antd/es/date-picker/generatePicker'
import 'antd/es/date-picker/style/index'

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)

export default DatePicker
