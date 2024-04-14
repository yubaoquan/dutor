<template>
  <v-row>
    <v-col>
      <v-progress-linear :model-value="scanningProgress" height="25" color="light-blue" striped>
        <strong>{{ Math.ceil(scanningProgress) }}%</strong>
      </v-progress-linear>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-expansion-panels model-value="detail">
        <v-expansion-panel title="查看详情" value="detail">
          <v-expansion-panel-text>
            <div class="flex justify-between items-start max-h-96 overflow-y-auto">
              <div class="grow shrink-0 w-1/2 p-2">
                <div>{{ $t('dutor.scanning') }} {{ scanningFiles.length }}</div>
                <div class="scan-list">
                  <div
                    v-for="file in scanningFiles"
                    :key="file.path"
                    class="truncate"
                    :title="file.path"
                  >
                    {{ file.path }}
                  </div>
                </div>
              </div>
              <div class="grow shrink-0 w-1/2 p-2">
                <div>{{ $t('dutor.finished') }} {{ finishedFiles.length }}</div>
                <div class="scan-list">
                  <div
                    v-for="file in finishedFiles"
                    :key="file.path"
                    class="truncate"
                    :title="file.path"
                  >
                    {{ file.path }}
                  </div>
                </div>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import type { FileItem } from '../../types/index';

const props = defineProps<{
  allFiles: FileItem[];
  scanningFiles: FileItem[];
  finishedFiles: FileItem[];
}>();

const scanningProgress = computed(() => {
  const total = props.allFiles.length;
  return total ? (props.finishedFiles.length / total) * 100 : 0;
});
</script>

<style lang="less" scoped></style>
