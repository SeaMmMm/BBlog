<script setup>
import IconComponent from '@/components/svgcomponent/IconComponent.vue'
import { auth, signOutUser } from '@/utils/firebase'
import {
  CalendarOutline,
  FlashOutline,
  HelpCircleOutline,
  HomeOutline as HomeIcon
} from '@vicons/ionicons5'
import { MessageOutlined, SettingOutlined } from '@vicons/antd'
import { Blog } from '@vicons/carbon'
import { NIcon, useMessage } from 'naive-ui'
import { h, onMounted, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const renderIcon = icon => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const message = useMessage()
const router = useRouter()
const userInfo = reactive({
  displayName: null,
  email: null,
  avatar: null
})
const menuOptions = reactive([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/home'
          }
        },
        { default: () => '主页' }
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/message'
          }
        },
        { default: () => '信息' }
      ),
    key: 'message',
    icon: renderIcon(MessageOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/blog'
          }
        },
        { default: () => '所有博客' }
      ),
    key: 'blogs',
    icon: renderIcon(Blog)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/info'
          }
        },
        { default: () => '个人信息' }
      ),
    key: 'info',
    icon: renderIcon(SettingOutlined)
  }
])

const options = reactive([
  { label: '用户设置', key: 'set user' },
  { label: '退出登录', key: 'sign out' }
])

const signOut = async () => {
  try {
    await signOutUser()
    router.push('/')
    message.success('已退出')
  } catch (error) {
    message.error('error')
  }
}

const handleSelect = async key => {
  switch (String(key)) {
    case 'set user':
      {
        router.push('/user/info')
      }
      break

    default:
      {
        await signOut()
      }
      break
  }
}

onMounted(() => {
  const { currentUser } = auth

  userInfo.displayName = currentUser.displayName
  userInfo.email = currentUser.email
  userInfo.avatar = currentUser.photoURL
})
</script>

<template>
  <div class="userHome">
    <div class="g-top">
      <div class="topwrapper">
        <div class="gtext">
          <IconComponent :size="28" />
          <n-h2>
            <n-text type="info">BBlog</n-text>
          </n-h2>
        </div>
        <n-input placeholder="搜索">
          <template #prefix>
            <n-icon :component="FlashOutline" />
          </template>
        </n-input>
        <div class="mediums">
          <n-icon :component="CalendarOutline" :size="22" />
          <n-icon :component="HelpCircleOutline" :size="22" />
        </div>
        <div class="user">
          <n-text strong type="default">{{
            userInfo.email ? userInfo.email : userInfo.displayName
          }}</n-text>
          <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <n-avatar
              style="cursor: pointer"
              round
              lazy
              :src="userInfo.avatar"
            />
          </n-dropdown>
        </div>
      </div>
    </div>
    <div class="g-container">
      <div class="g-left">
        <n-menu :options="menuOptions" />
      </div>
      <div class="g-middle">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.userHome {
  overflow: hidden;
  height: 100vh;
}
.g-top {
  background: #e4f9f5;

  .topwrapper {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-items: center;
    align-items: center;
    justify-content: space-around;
  }
  .mediums {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .gtext {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
.g-container {
  position: relative;
  // height: 100vh;
  min-width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & > div {
    height: 100vh;
    overflow: scroll;
  }
}

.g-middle {
  order: 2;
  flex: auto 1 0;
}

.g-left {
  order: 1;
  flex: 240px 0 0;
  background-color: cornsilk;
}
</style>
