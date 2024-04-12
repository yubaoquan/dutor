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
            <v-container fluid>
              <v-row>
                <v-col>
                  <div>扫描中 {{ scanningFiles.length }}</div>
                  <div class="scan-list">
                    <div v-for="file in scanningFiles" :key="file.path">{{ file.path }}</div>
                  </div>
                </v-col>
                <v-col>
                  <div>已扫描 {{ finishedFiles.length }}</div>
                  <div class="scan-list">
                    <div v-for="file in finishedFiles" :key="file.path">{{ file.path }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
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
