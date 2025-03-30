<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { type FormInstance, type FormRules } from "element-plus"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import { type LoginRequestData } from "@/api/login/types/login"
import { useFocus } from "./hooks/useFocus"

const router = useRouter()
const { isFocus, handleBlur, handleFocus } = useFocus()

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const codeUrl = ref("")
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "",
  password: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
  ]
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields: any) => {

    loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          router.push({ path: "/" })
        })
        .catch(() => {
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    // if (valid) {
    //   loading.value = true
    //   useUserStore()
    //     .login(loginFormData)
    //     .then(() => {
    //       router.push({ path: "/" })
    //     })
    //     .catch(() => {
    //       loginFormData.password = ""
    //     })
    //     .finally(() => {
    //       loading.value = false
    //     })
    // } else {
    //   console.error("表单校验不通过", fields)
    // }
  })
}
/** 创建验证码 */
// const createCode = () => {
//   // 先清空验证码的输入
//   loginFormData.code = ""
//   // 获取验证码
//   codeUrl.value = ""
//   getLoginCodeApi().then((res) => {
//     codeUrl.value = res.data
//   })
// }

/** 初始化验证码 */
// createCode()
</script>

<template>
  <div class="login-container" tabindex="-1">
    <!-- 顶部 -->
    <div class="login-bg">
      <div class="login-bg-img" />
    </div>
    <div class="login-form">
      <div class="text-30px font-extrabold pb-60px">{{ VITE_APP_TITLE }}</div>
      <el-form
        ref="loginFormRef"
        :model="loginFormData"
        :rules="loginFormRules"
        @keyup.enter="handleLogin"
        class="w-440px"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginFormData.username"
            placeholder="用户名"
            type="text"
            tabindex="1"
            :prefix-icon="User"
            size="large"
            class="h-[50px] px-20px"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginFormData.password"
            placeholder="密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            class="h-[50px] px-20px"
            show-password
            @blur="handleBlur"
            @focus="handleFocus"
          />
        </el-form-item>
        <el-button :loading="loading" type="primary" class="w-full" @click.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-bg {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#f8fbfc 0%, #ffffff 100%);
    .login-bg-img {
      width: 83.33%;
      height: 43.75%;
      background: url("@/assets/login/login-bg.png") no-repeat center/contain;
    }
  }
  .login-form {
    height: 100%;
    width: 100%;
    background-color: white;
    @media (min-width: 1024px) {
      /* lg 即 large 断点 */
      width: 600px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

:deep(.el-form) {
  max-height: 100%;
  .el-form-item {
    margin-bottom: 30px !important;
  }
  .el-form-item__error {
    font-size: var(--el-font-size-medium);
    padding-top: 7px;
  }
}

:deep(.el-input) {
  //@apply rounded-[--el-border-radius-large] bg-#F6F7FB;
  background: #f6f7fb;
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    .el-input__inner {
      @apply font-bold;
      font-size: var(--el-font-size-large);
    }
    .el-input__inner::placeholder {
      @apply font-normal text-[--el-text-color-secondary];
    }

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}

.el-button {
  height: 50px;
  font-weight: bold;
  font-size: 20px;
}
// .login-container {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   min-height: 100%;
//   .theme-switch {
//     position: fixed;
//     top: 5%;
//     right: 5%;
//     cursor: pointer;
//   }
//   .login-card {
//     width: 480px;
//     max-width: 90%;
//     border-radius: 20px;
//     box-shadow: 0 0 10px #dcdfe6;
//     background-color: var(--el-bg-color);
//     overflow: hidden;
//     .title {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 150px;
//       img {
//         height: 100%;
//       }
//     }
//     .content {
//       padding: 20px 50px 50px 50px;
//       :deep(.el-input-group__append) {
//         padding: 0;
//         overflow: hidden;
//         .el-image {
//           width: 100px;
//           height: 40px;
//           border-left: 0px;
//           user-select: none;
//           cursor: pointer;
//           text-align: center;
//         }
//       }
//       .el-button {
//         width: 100%;
//         margin-top: 10px;
//       }
//     }
//   }
// }
</style>
