import { isEqual, get, cloneDeep, pick } from "lodash";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";

function useStore(selector, initialValue = {}, option = {}) {
  try {
    const fields = useMemo(() => {
      let result = [];
      if (option.fields) {
        if (typeof option.fields === "string") {
          result = option.fields
            .split(",")
            .filter((item) => item)
            .map((item) => item.trim());
        } else {
          result = option.fields;
        }
      }
      return result;
    }, [option.fields]);

    const memoData = useMemo(() => {
      if (option.hasOwnProperty("memoData")) {
        return option.memoData;
      }
      return true;
    }, [option.memoData]);

    const refInit = useRef(initialValue);
    const refData = useRef(initialValue);

    const data = useSelector((state) => {
      const model =
        typeof selector === "function"
          ? selector(state) || initialValue
          : get(state, selector, initialValue);
      if (fields.length > 0) {
        return pick(model, fields);
      }
      return model;
    }, isEqual);

    const value = useMemo(() => {
      let result = data;
      if (memoData) {
        if (!isEqual(refData.current, result)) {
          refData.current = cloneDeep(result);
        }
        return refData.current || refInit.current;
      }
      return result || refInit.current;
    }, [data, memoData]);

    return value;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
}

export default useStore;
