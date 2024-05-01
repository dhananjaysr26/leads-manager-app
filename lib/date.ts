import moment from 'moment';

export const formatDate = (dateString: string) => {
  const date = moment(dateString);
  const dayOfMonth = date.date();
  const month = date.format('MMM');
  const year = date.year();

  return `${dayOfMonth} ${month} ${year}`;
};
