// event main part of name is extracted from the event name,
// which is a string that contains the event name and suffixes.
export const extractEventName = (eventName: string) => {
  return eventName.split('-')[0];
}