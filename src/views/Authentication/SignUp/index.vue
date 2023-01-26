<script setup>
import man from '@/assets/signupman.svg'
import { THEME_STORE, USER_STORE } from '@/store/constant'
import {
  createAuthUserWithEmailAndPassword,
  signInWithGithubPopup,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '@/utils/firebase'
import { User } from '@vicons/tabler'
import { LogoGoogle, UserAdmin } from '@vicons/carbon'
import {
  Password20Regular,
  PeopleError20Regular,
  Voicemail20Filled
} from '@vicons/fluent'
import { Glasses, GlassesOutline } from '@vicons/ionicons5'
import { BrandGithub } from '@vicons/tabler'
import { NIcon, useMessage } from 'naive-ui'
import isEmail from 'validator/es/lib/isEmail'
import isEmpty from 'validator/es/lib/isEmpty'
import isStrongPassword from 'validator/es/lib/isStrongPassword'
import { computed, h, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const formRef = ref(null)
const store = useStore()
const isLoading = ref(false)
const message = useMessage()
const router = useRouter()

const formValue = reactive({
  user: {
    displayName: '',
    email: '',
    password: ''
  }
})
const theme = computed(() => store.getters[THEME_STORE.GET_MODEL])
const setCurrentUser = payload =>
  store.commit(USER_STORE.SET_CURRENT_USER, payload)
const rules = ref({
  user: {
    email: {
      required: true,
      trigger: ['input', 'blur'],
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
      trigger: ['input', 'blur'],
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (isStrongPassword(value)) {
            resolve()
          } else if (isEmpty(value)) {
            reject('请输入密码')
          } else {
            reject('至少包含大写字母和特殊字符串')
          }
        })
      }
    }
  }
})

const handleValidateClick = e => {
  e.preventDefault()

  formRef.value?.validate(async errors => {
    isLoading.value = true
    if (!errors) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          formValue.user.email,
          formValue.user.password
        )

        await createUserDocumentFromAuth(user, {
          displayName: formValue.user.displayName
        })
        resetForm()

        router.push('/login')
        message.success('创建成功!', {
          icon: () => h(NIcon, null, { default: () => h(UserAdmin) })
        })
      } catch (error) {
        message.error(
          error.code === 'auth/email-already-in-use'
            ? '邮箱已被注册'
            : error.code,
          {
            icon: () =>
              h(NIcon, null, { default: () => h(PeopleError20Regular) })
          }
        )
      }
    }
    isLoading.value = false
  })
}
const resetForm = () => {
  const { user } = formValue
  user.email = ''
  user.password = ''
  user.displayName = ''
}
const LoginWithGoogle = async () => {
  try {
    const { user } = await signInWithGooglePopup()
    setCurrentUser(user)
    await createUserDocumentFromAuth(user)
  } catch (error) {
    message.error(error.code)
  }
}
const LoginWithGithub = async () => {
  try {
    const { user } = await signInWithGithubPopup()
    setCurrentUser(user)
    await createUserDocumentFromAuth(user)
  } catch (error) {
    message.error(error.code)
  }
}
</script>

<template>
  <div class="lwrapper" :class="theme === 'dark' && 'darkBg'">
    <div class="lcontent">
      <n-image
        lazy
        :src="man"
        preview-disabled
        :height="500"
        style="pointer-events: none"
      />
      <Transition
        Transition
        appear
        appear-active-class="animate__animated animate__fadeInRight"
      >
        <div class="leftWrapper" :class="theme === 'dark' && 'darkForm'">
          <div class="contant">
            <n-h1>
              <n-text strong>Signup</n-text>
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
              <n-form-item label="用户名">
                <n-input
                  v-model:value="formValue.user.displayName"
                  round
                  clearable
                  placeholder="name"
                >
                  <template #prefix>
                    <n-icon :component="User" />
                  </template>
                </n-input>
              </n-form-item>
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
                secondary
                round
                type="success"
                @click="handleValidateClick"
              >
                Sign Up
              </n-button>
            </n-form>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.darkForm {
  background: #1f3134 !important;
}
.darkBg {
  background: #80989b;
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
