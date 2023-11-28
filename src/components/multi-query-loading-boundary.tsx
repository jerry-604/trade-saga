import {
  QueriesResults,
  UseQueryOptionsForUseQueries,
} 
// @ts-ignore
from '@trpc/react-query/dist/internals/useQueries';
import { BeatLoader } from 'react-spinners';
import { pluck, prop } from 'ramda';
type Props<
  TQueryOptions extends UseQueryOptionsForUseQueries<any, any, any, any>[],
> = {
  queries: [...QueriesResults<TQueryOptions>];
  loadingScreen?: React.ReactNode;
  errorMsg?: string | React.ReactNode;
  children: (data: [...any[]]) => React.ReactNode;
  onlyShowLoader?: boolean;
};

export const MultiQueryLoadingBoundary = <
  T extends UseQueryOptionsForUseQueries<any, any, any, any>[],
>({
  queries,
  loadingScreen = <MultiLoaderPage />,
  errorMsg = 'Something went wrong...',
  onlyShowLoader = false,
  children,
}: Props<T>): JSX.Element => {
  if (queries.some(prop('isLoading')) || onlyShowLoader) {
    return <>{loadingScreen}</>;
  }

  if (queries.some(prop('isError'))) {
    return <>{errorMsg}</>;
  }

  return <>{children(pluck('data', queries))}</>;
};


export const MultiLoaderPage = (): JSX.Element => {
    return (
      <div className="h-full w-full flex flex-row justify-center">
        <BeatLoader className="place-self-center" size="48px" />
      </div>
    );
  };
  