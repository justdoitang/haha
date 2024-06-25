import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/data-overview",
    meta: {
      title: "系统首页",
      elIcon: "House"
    },
    children: [
      {
        path: "data-overview",
        component: () => import("@/views/dashboard/DataOverview.vue"),
        name: "DataOverview",
        meta: {
          title: "数据总览",
          elIcon: "Notification",
          affix: true
        }
      },
      {
        path: "energy-achievement",
        component: () => import("@/views/dashboard/EnergyAchievement.vue"),
        name: "EnergyAchievement",
        meta: {
          title: "节能成果",
          elIcon: "Notebook"
        }
      }
    ]
  },
  {
    path: "/energy-analysis",
    component: Layouts,
    redirect: "/energy-analysis/report",
    name: "EnergyAnalysis",
    meta: {
      title: "能耗分析",
      elIcon: "PieChart",
      alwaysShow: true
    },
    children: [
      {
        path: "report",
        component: () => import("@/views/energy-analysis/EnergyAnalysisReport.vue"),
        name: "EnergyAnalysisReport",
        meta: {
          title: "能耗分析",
          elIcon: "Grid",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/energy-efficiency-analysis",
    component: Layouts,
    redirect: "/energy-efficiency-analysis/efficiency-calendar",
    name: "EnergyEfficiencyCalendar",
    meta: {
      title: "能效分析",
      elIcon: "Edit",
      alwaysShow: true
    },
    children: [
      {
        path: "efficiency-calendar",
        component: () => import("@/views/energy-efficiency-analysis/EnergyEfficiencyCalendar.vue"),
        name: "EnergyEfficiencyCalendar",
        meta: {
          title: "能效日历",
          elIcon: "Calendar"
        }
      },
      {
        path: "efficiency-query",
        component: () => import("@/views/energy-efficiency-analysis/EfficiencyQuery.vue"),
        name: "EfficiencyQuery",
        meta: {
          title: "能效查询",
          elIcon: "Histogram"
        }
      },
      {
        path: "efficiency-contrast",
        component: () => import("@/views/energy-efficiency-analysis/EfficiencyContrast.vue"),
        name: "EfficiencyContrast",
        meta: {
          title: "能效对比",
          elIcon: "Histogram"
        }
      },
      {
        path: "load-proportion",
        component: () => import("@/views/energy-efficiency-analysis/LoadProportion.vue"),
        name: "LoadProportion",
        meta: {
          title: "负荷比重",
          elIcon: "HelpFilled"
        }
      },
      {
        path: "hot-balance-rate",
        component: () => import("@/views/energy-efficiency-analysis/HotBalanceRate.vue"),
        name: "HotBalanceRate",
        meta: {
          title: "热平衡率",
          elIcon: "Magnet"
        }
      }
    ]
  },
  {
    path: "/alarm-maintenance",
    component: Layouts,
    redirect: "/alarm-maintenance/alarm-maintenance-query",
    name: "AlarmMaintenance",
    meta: {
      title: "报警运维",
      elIcon: "Warning",
      alwaysShow: true
    },
    children: [
      {
        path: "real-time-alarm",
        component: () => import("@/views/alarm-maintenance/RealTimeAlarm.vue"),
        name: "RealTimeAlarm",
        meta: {
          title: "实时警报",
          elIcon: "Coordinate"
        }
      },
      {
        path: "alarm-maintenance-query",
        component: () => import("@/views/alarm-maintenance/AlarmMaintenanceQuery.vue"),
        name: "AlarmMaintenanceQuery",
        meta: {
          title: "报警查询",
          elIcon: "Bell"
        }
      },
      {
        path: "device-ledger",
        component: () => import("@/views/alarm-maintenance/DeviceLedger.vue"),
        name: "DeviceLedger",
        meta: {
          title: "设备台账",
          elIcon: "Notebook"
        }
      }
    ]
  },
  {
    path: "/report-manage",
    component: Layouts,
    redirect: "/report-manage/cold-station-log",
    name: "ReportManage",
    meta: {
      title: "报表管理",
      elIcon: "Management",
      alwaysShow: true
    },
    children: [
      {
        path: "cold-station-log",
        component: () => import("@/views/report-manage/ColdStationLog.vue"),
        name: "ColdStationLog",
        meta: {
          title: "冷站日志",
          elIcon: "DocumentCopy"
        }
      }
    ]
  },
  {
    path: "/system-config",
    component: Layouts,
    redirect: "/system-config/energy-param",
    name: "SystemConfig",
    meta: {
      title: "系统设置",
      elIcon: "Setting",
      alwaysShow: true
    },
    children: [
      {
        path: "energy-param",
        component: () => import("@/views/system-config/EnergyParam.vue"),
        name: "EnergyParam",
        meta: {
          title: "能源参数",
          elIcon: "Van"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面级",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "按钮级" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  }
]

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
