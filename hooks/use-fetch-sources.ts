import { useCallback, useMemo, useState } from "react";
import { useStateWithRef } from "@/hooks/use-state-with-ref";
import type {
  FetchSourceDescriptions,
  FetchSourceOption,
} from "@/models/fetch";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import posthog from "posthog-js";

export const useFetchSources = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [options, optionsRef, setOptions] = useStateWithRef<
    FetchSourceOption[]
  >([]);
  const [descriptions, setDescriptions] =
    useState<FetchSourceDescriptions | null>(null);

  const fetchSources = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.getSources();
      response?.options && setOptions(response.options);
      response?.descriptions && setDescriptions(response.descriptions);
    } catch (error) {
      console.info("unable to fetch sources", error);
      const message = readError(error);
      posthog.capture("sources-error", { message });
    } finally {
      setLoading(false);
    }
  }, [setOptions]);

  return useMemo(
    () => ({
      isLoading,
      options,
      optionsRef,
      descriptions,
      fetchSources,
    }),
    [isLoading, options, optionsRef, descriptions, fetchSources],
  );
};
