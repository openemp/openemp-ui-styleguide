import React from 'react';

export default function Root(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name } = props;
  return <section>{name} is mounted!</section>;
}
