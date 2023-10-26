import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import { AnyQueryProcedure } from '@trpc/server';
import { BeatLoader } from 'react-spinners';

type Props<TResultData> = {
  query: TRPCQuery<TResultData>;
  loadingScreen?: React.ReactNode;
  errorMsg?: string | React.ReactNode;
  children: (data: TResultData) => React.ReactNode;
  onlyShowLoader?: boolean;
};

export const LoadingBoundary = <T,>({
  query,
  loadingScreen = <LoaderPage />,
  errorMsg = 'Something went wrong...',
  onlyShowLoader = false,
  children,
}: Props<T>): JSX.Element => {
  if (query.isLoading || onlyShowLoader) {
    return <>{loadingScreen}</>;
  }

  if (query.isError) {
    return <>{errorMsg}</>;
  }

  return <>{children(query.data)}</>;
};

export type TRPCQuery<TData> = UseTRPCQueryResult<
  TData,
  TRPCClientErrorLike<AnyQueryProcedure>
>;

export type TRPCMultiQuery<TData extends unknown[]> = [...TData];

export const LoaderPage = (): JSX.Element => {
    return (
      <div className="h-full w-full flex flex-row justify-center">
        <BeatLoader className="place-self-center" size="48px" />
      </div>
    );
  };
  