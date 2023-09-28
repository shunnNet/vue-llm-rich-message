const markdownHint = `You must reply in markdown format. The markdown allow custom syntax to use component. I will provide you a 1 or more text. You must insert it in your anwser at appropriate position.`

export type ComponentOption = {
  component: string
  description: string
  attributes?: Record<string, string>
}

export const computeFormatHint = (component: ComponentOption[] | ComponentOption) => {
  const finalComponentList: ComponentOption[] = Array.isArray(component) ? component : [component]

  const componentsInstruction = finalComponentList
    .map((item, i) => {
      const attributes = item.attributes
        ? Object.entries(item.attributes)
            .map(([key, value]) => {
              return ` ${key}="${value}"`
            })
            .join(' ')
        : ''

      return `--text you must insert ${i + 1}--
<slot name="${item.component}"${attributes}></slot>
  
--text description ${i + 1}--
${item.description}`
    })
    .join('\n\n')

  return `
--format instruction--
${markdownHint}

${componentsInstruction}`
}
