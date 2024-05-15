import { useFormikContext } from 'formik';

const useFormDirty = () => {
  const { dirty } = useFormikContext();
  return dirty;
};

export default useFormDirty;
