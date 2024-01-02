<template>
  <div id="questionsView">
    <a-row :gutter="[10, 24]">
      <a-col :md="17" :xs="24">
        <div id="questionsViewLeft">
          <a-form :model="searchParams" layout="inline">
            <a-form-item field="status" label="状态" style="width: 150px">
              <a-select v-model="searchParams.status" :default-value="''">
                <a-option value="''">全部</a-option>
                <a-option>已完成</a-option>
                <a-option>未完成</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="level" label="难度" style="width: 140px">
              <a-select v-model="searchParams.level" :default-value="''">
                <a-option value="''">全部</a-option>
                <a-option>简单</a-option>
                <a-option>中等</a-option>
                <a-option>困难</a-option>
              </a-select>
            </a-form-item>
            <!--            <a-form-item-->
            <!--              field="title"-->
            <!--              label="题目名称"-->
            <!--              style="min-width: 260px"-->
            <!--            >-->
            <!--              <a-input v-model="searchParams.title" />-->
            <!--            </a-form-item>-->
            <a-form-item field="tags" label="标签" style="min-width: 260px">
              <a-input-tag v-model="searchParams.tags" />
            </a-form-item>
            <a-form-item field="title">
              <a-input-search
                :style="{ width: '260px' }"
                placeholder="输入题目名称或关键词"
                search="doSearch"
                v-model="searchParams.title"
              />
              <!--              <a-button type="outline" @click="doSearch">搜索</a-button>-->
            </a-form-item>
          </a-form>
          <a-table
            :ref="tableRef"
            :columns="columns"
            :data="dataList"
            :pagination="{
              showTotal: true,
              pageSize: searchParams.pageSize,
              current: searchParams.current,
              total,
            }"
            @page-change="onPageChange"
            size="large"
          >
            <template #status="{ record }">
              <icon-check-circle
                v-if="record.status === 1"
                :style="{ color: 'green', fontSize: 18 }"
              />
            </template>
            <template #tags="{ record }">
              <a-space wrap>
                <a-tag
                  v-for="(tag, index) of record.tags"
                  :key="index"
                  size="large"
                  style="color: gray"
                  >{{ tag }}
                </a-tag>
              </a-space>
            </template>
            <template #level="{ record }">
              <a-space wrap>
                <span
                  :style="{
                    color: getColor(record.level),
                    fontWeight: 500,
                    fontSize: 17,
                  }"
                  >{{ record.level }}</span
                >
              </a-space>
            </template>
            <template #acceptedRate="{ record }">
              {{
                `${
                  record.acceptedNum
                    ? ((record.acceptedNum * 100) / record.submitNum).toFixed(2)
                    : "0.00"
                }% (${record.acceptedNum} / ${record.submitNum})`
              }}
            </template>
            <template #createTime="{ record }">
              {{ moment(record.createTime).format("YYYY-MM-DD") }}
            </template>
            <template #optional="{ record }">
              <a-space class="icon-hover" align="center">
                <icon-bookmark
                  style="
                     {
                      fontsize: '40px';
                    }
                  "
                  stroke-linecap="round"
                  @click="toQuestionPage(record)"
                />
              </a-space>

              <!--                <a-button-->
              <!--                  type="outline"-->
              <!--                  @click="toQuestionPage(record)"-->
              <!--                  size="Small"-->
              <!--                  >做题-->
              <!--                </a-button>-->
            </template>
          </a-table>
        </div>
      </a-col>
      <a-col :md="7" :xs="24">
        <a-card title="当前进度">
          <a-row :gutter="[3, 10]">
            <a-col :md="10">
              <div id="main"></div>
            </a-col>
            <a-col :md="5">
              <a-row><span>通过数</span></a-row>
              <a-row><span>5</span></a-row>
            </a-col>
            <a-col :md="5">
              <a-row><span>提交数</span></a-row>
              <a-row><span>10</span></a-row>
            </a-col>
            <a-col :md="4">
              <a-row><span>通过率</span></a-row>
              <a-row><span>50%</span></a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import * as echarts from "echarts";
import {
  Page_Question_,
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);
const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const myChart = ref();
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  level: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const onPageChange = (number: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: number,
  };
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const getColor = (level: string) => {
  switch (level) {
    case "简单":
      return "rgb(77, 172, 156)";
    case "中等":
      return "rgb(245, 186, 65)";
    case "困难":
      return "rgb(235, 69, 90)";
  }
};

// 监听加载函数中数据的变化，重新执行
watchEffect(() => {
  loadData();
});

const initChart = () => {
  let chartDom = document.getElementById("main");
  myChart.value = echarts.init(chartDom);
  let option = {
    graphic: [
      {
        type: "text",
        left: "center", // 文本居中
        top: "middle", // 文本居中
        style: {
          text: [
            "{name|全部}",
            "{divider| }",
            "{divider| }",
            "{divider| }",
            "{value|" + (4 + 3 + 1) + "}",
            "{line|——————}",
            "{divider| }",
            "{total|" + 16 + "}",
          ].join("\n"),
          rich: {
            name: {
              align: "center",
              fontSize: 14,
              fontWeight: 600,
            },
            value: {
              align: "center",
              fontSize: 20,
              fontWeight: 700,
            },
            line: {
              fontSize: 6,
              fontWeight: "bold",
            },
            divider: {
              fontSize: 4,
            },
            total: {
              align: "center",
              fontSize: 14,
              fontWeight: 600,
            },
          },
        },
      },
    ],
    color: ["#91cc75", "#fac858", "#ee6666", "#000a200d"],
    series: [
      {
        type: "pie",
        radius: ["75%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 2,
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          show: false,
          position: "center",
          formatter: function (params: any) {
            return [
              "{name|" + params.name + "\n}",
              "{divider|\n}",
              "{value|" + params.value + "}",
              "——————",
              "{divider|\n}",
              "{total|" + 16 + "}",
            ].join("\n");
          },
          rich: {
            name: {
              fontSize: 14,
              fontWeight: 600,
            },
            value: {
              fontSize: 20,
              fontWeight: 700,
              color: "green",
            },
            divider: {
              fontSize: 0,
            },
            total: {
              fontSize: 14,
              fontWeight: 600,
              color: "#3c3c434d",
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 6,
            fontWeight: "bold",
          },
        },
        data: [
          { value: 4, name: "简单" },
          { value: 3, name: "中等" },
          { value: 1, name: "困难" },
          { value: 8, name: "未通过" },
        ],
      },
    ],
  };

  option && myChart.value.setOption(option);
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
  initChart();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "状态",
    slotName: "status",
  },
  // {
  //   title: "题号",
  //   dataIndex: "id",
  // },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "难度",
    slotName: "level",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  // {
  //   title: "创建时间",
  //   slotName: "createTime",
  // },
  {
    title: "操作",
    align: "center",
    slotName: "optional",
  },
];

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 提交搜索题目
 */
const doSearch = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  // loadData();
};
</script>

<style>
#questionsView {
  /*max-width: 1480px;*/
  /*margin: 20px auto;*/
}

#questionsViewLeft {
  background: #ffffff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid rgb(229, 230, 235);
}

.arco-icon {
  font-size: 18px;
}

.icon-hover :hover {
  cursor: pointer;
}

.arco-tag-size-large {
  height: 23px !important;
  font-size: 13px !important;
  border: 1px solid gray;
}

.arco-space-item {
  margin-bottom: 2px !important;
  margin-top: 2px !important;
}

.arco-table-tr .arco-table-th {
  background: white !important;
}

#main {
  width: 100%;
  height: 139px;
}
</style>
