// 确保导入React以获取事件类型定义
import React from 'react'
import { useCurrentModal } from './hooks'
import { motion } from 'framer-motion'
import { setVisited } from '@/utils/firstVisit'

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

export function CookiesNotice() {
  const { dismiss } = useCurrentModal()

  const handleAccept = () => {
    setVisited()
    dismiss()
  }

  // 修复1: 正确导入并使用React事件类型
  // 修复2: 使用下划线前缀标记未使用的参数
  const handleLearnMore = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    // 先关闭模态框，再允许链接跳转
    dismiss()
    // 不需要阻止默认行为，让链接正常跳转
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-lg p-4 shadow-xl z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">🍪欢迎访问我们的网站</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            我们使用cookies来提升您的浏览体验。继续使用我们的网站，即表示您同意我们的cookies政策。您可点击了解更多以获取我们的cookies政策、隐私政策和条款与条件。
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/cookies"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 inline-block"
            onClick={handleLearnMore}
          >
            了解更多
          </a>
          <button
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
            onClick={handleAccept}
          >
            同意
          </button>
        </div>
      </div>
    </motion.div>
  )
}
