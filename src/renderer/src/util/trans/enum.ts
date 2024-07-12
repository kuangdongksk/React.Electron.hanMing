import { IOptions } from '@renderer/interface/utils'

export const enumToArray = (enumObj: any): string[] => {
  return Object.values(enumObj)
}

export const enumToOptions = (enumObj: any): IOptions<string>[] => {
  let options: IOptions<string>[] = []
  for (const key in enumObj) {
    options.push({
      label: enumObj[key],
      value: enumObj[key]
    })
  }
  return options
}
