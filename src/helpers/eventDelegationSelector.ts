export const eventDelegationSelector = (event:React.MouseEvent, tagName: string) => {

  const target = event.target as HTMLElement | null

  // get html element through event delegation
  const element =  (target?.tagName === tagName)
    ? target : (target?.parentElement?.tagName === tagName )
    ? target.parentElement : null;

    return element
}
