import { useEffect } from 'react'
// 修复 hooks 导入路径
import { useModal } from '@/components/ui/modal/hooks'
import { isFirstVisit } from '@/utils/firstVisit'
import { CookiesNotice } from '@/components/ui/modal/CookiesNotice'

export function CookiesNoticeProvider() {
  const { present } = useModal()

  useEffect(() => {
    // 检查是否是首次访问
    if (isFirstVisit()) {
      // 延迟显示，确保页面加载完成
      setTimeout(() => {
        present({
          content: <CookiesNotice />
        })
      }, 1000)
    }
  }, [present]) // 添加 present 到依赖数组

  return null
}