<script setup>
import woman from '@/assets/loginwoman.svg'
import { THEME_STORE, USER_STORE } from '@/store/constant'
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGithubPopup,
  signInWithGooglePopup
} from '@/utils/firebase'
import { LogoGoogle } from '@vicons/carbon'
import { Password20Regular, Voicemail20Filled } from '@vicons/fluent'
import {
  CheckmarkDoneCircleOutline,
  Glasses,
  GlassesOutline
} from '@vicons/ionicons5'
import { BrandGithub, UserExclamation } from '@vicons/tabler'
import { NIcon, useMessage } from 'naive-ui'
import isEmail from 'validator/es/lib/isEmail'
import isEmpty from 'validator/es/lib/isEmpty'
import { computed, h, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const formRef = ref(null)
const store = useStore()
const message = useMessage()
const isLoading = ref(false)
const router = useRouter()

const formValue = reactive({
  user: {
    email: '',
    password: ''
  }
})
const rules = reactive({
  user: {
    email: {
      required: true,
      trigger: 'blur',
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (isEmail(value)) {
            resolve()
          } else if (isEmpty(value)) {
            reject('请输入邮箱')
          } else {
            reject('邮箱不合法')
          }
        })
      }
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  }
})
const theme = computed(() => store.getters[THEME_STORE.GET_MODEL])

const setCurrentUser = payload =>
  store.commit(USER_STORE.SET_CURRENT_USER, payload)

const handleValidateClick = async e => {
  e.preventDefault()

  formRef.value?.validate(async errors => {
    isLoading.value = true
    if (!errors) {
      try {
        const { user } = await signInAuthUserWithEmailAndPassword(
          formValue.user.email,
          formValue.user.password
        )
        setCurrentUser(user)
        await createUserDocumentFromAuth(user)
        resetForm()

        router.push('/user')
        message.success('登录成功', {
          icon: () =>
            h(NIcon, null, { default: () => h(CheckmarkDoneCircleOutline) })
        })
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          message.error('用户不存在', {
            icon: () => h(NIcon, null, { default: () => h(UserExclamation) })
          })
        } else {
          message.error(error.code, {
            icon: () => h(NIcon, null, { default: () => h(UserExclamation) })
          })
        }
      }
    }
    isLoading.value = false
  })
}

const resetForm = () => {
  const { user } = formValue
  user.email = ''
  user.password = ''
}
const LoginWithGoogle = async () => {
  try {
    const { user } = await signInWithGooglePopup()
    setCurrentUser(user)
    await createUserDocumentFromAuth(user)
    router.push('/user')
    message.success('log in succeed')
  } catch (error) {
    message.error(error.code)
  }
}
const LoginWithGithub = async () => {
  try {
    const { user } = await signInWithGithubPopup()
    setCurrentUser(user)
    await createUserDocumentFromAuth(user)
    router.push('/user')
    message.success('log in succeed')
  } catch (error) {
    message.error(error.code)
  }
}
</script>

<template>
  <div class="lwrapper" :class="theme === 'dark' && 'darkBg'">
    <div class="lcontent">
      <Transition
        appear
        appear-active-class="animate__animated animate__fadeInLeft"
      >
        <div class="leftWrapper" :class="theme === 'dark' && 'darkForm'">
          <div class="contant">
            <n-h1>
              <n-text strong>Login</n-text>
            </n-h1>
            <div class="buttons">
              <n-icon
                @click="LoginWithGoogle"
                class="icon"
                :component="LogoGoogle"
              />
              <n-icon
                @click="LoginWithGithub"
                class="icon"
                :component="BrandGithub"
              />
            </div>
            <n-text type="info">or</n-text>
            <n-form
              :rules="rules"
              :model="formValue"
              ref="formRef"
              class="form"
            >
              <n-form-item label="邮箱" path="user.email">
                <n-input
                  v-model:value="formValue.user.email"
                  round
                  clearable
                  placeholder="email address"
                >
                  <template #prefix>
                    <n-icon :component="Voicemail20Filled" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item label="密码" path="user.password">
                <n-input
                  v-model:value="formValue.user.password"
                  type="password"
                  round
                  show-password-on="click"
                  placeholder="password"
                >
                  <template #prefix>
                    <n-icon :component="Password20Regular" />
                  </template>
                  <template #password-visible-icon>
                    <n-icon :size="16" :component="GlassesOutline" />
                  </template>
                  <template #password-invisible-icon>
                    <n-icon :size="16" :component="Glasses" />
                  </template>
                </n-input>
              </n-form-item>
              <n-button
                :loading="isLoading"
                attr-type="button"
                strong
                round
                type="info"
                @click="handleValidateClick"
              >
                Log In
              </n-button>
            </n-form>
          </div>
        </div>
      </Transition>
      <n-image
        lazy
        :src="woman"
        preview-disabled
        :height="500"
        style="pointer-events: none"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.darkForm {
  background: #1685a9 !important;
}
.darkBg {
  background: #4b5cc4;
}

.lwrapper {
  padding-top: 190px;
  padding-bottom: 100px;
  transition: 0.5s ease;
  .lcontent {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-items: center;
    align-items: center;
    justify-content: center;
    gap: 144px;

    .leftWrapper {
      background: white;
      border-radius: 24px;
      padding: 40px 60px;
      .contant {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;

        .form {
          display: grid;
          grid-template-rows: repeat(3, auto);
        }
      }
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(2, auto);
      align-items: center;
      gap: 12px;

      .icon {
        background: #fafafa;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
