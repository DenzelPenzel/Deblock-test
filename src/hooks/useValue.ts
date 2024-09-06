import { useMemo } from 'react';

export const useValue = <T>(object: T): T => useMemo(() => object, [object]);
