import { ref } from 'vue';
import DeleteAllConfirm from './delete-all-confirm.vue';

export default () => {
  const deleteAllAsk = ref(false);

  const handleDeleteAllCancel = () => {
    deleteAllAsk.value = false;
  };

  const handleDeleteAllClick = () => {
    deleteAllAsk.value = true;
  };

  return {
    DeleteAllConfirm,
    deleteAllAsk,
    handleDeleteAllCancel,
    handleDeleteAllClick,
  };
};
