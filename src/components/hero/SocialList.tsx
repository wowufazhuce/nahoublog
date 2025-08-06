import clsx from 'clsx'
import { hero } from '@/config.json'
import { motion } from 'framer-motion'
import { useModal } from '@/components/ui/modal'

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

// 微信二维码组件
function WeChatQRCode() {
  return (
    <motion.div
      className="bg-primary rounded-lg p-6 border border-primary max-w-xs mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <h3 className="text-center text-lg font-bold mb-4">微信公众号</h3>
      <div className="flex justify-center mb-4">
        <img
          src="/i/QRcode.png"
          alt="微信公众号二维码"
          className="w-48 h-48 object-cover"
        />
      </div>
      <p className="text-center text-sm text-secondary">扫码关注获取更多内容</p>
    </motion.div>
  )
}

export function SocialList({ className }: { className?: string }) {
  const { present } = useModal()

  const handleWeChatClick = (e: React.MouseEvent) => {
    e.preventDefault()
    present({
      content: <WeChatQRCode />,
    })
  }

  return (
    <motion.ul
      className={clsx(
        'flex gap-4 flex-wrap items-center justify-center lg:justify-start',
        className,
      )}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.1,
      }}
    >
      {hero.socials.map((social) => (
        <motion.li key={social.name} variants={itemVariants}>
          {social.name === '微信' ? (
            <a
              className="relative size-9 text-white text-xl flex justify-center items-center group"
              href={social.url}
              title={social.name}
              onClick={handleWeChatClick}
              rel="noopener noreferrer"
            >
              <span
                className="absolute inset-0 -z-1 rounded-full group-hover:scale-105 transition"
                style={{ backgroundColor: social.color }}
              ></span>
              <i className={clsx('iconfont', social.icon)} />
            </a>
          ) : (
            <a
              className="relative size-9 text-white text-xl flex justify-center items-center group"
              href={social.url}
              title={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="absolute inset-0 -z-1 rounded-full group-hover:scale-105 transition"
                style={{ backgroundColor: social.color }}
              ></span>
              <i className={clsx('iconfont', social.icon)} />
            </a>
          )}
        </motion.li>
      ))}
    </motion.ul>
  )
}
