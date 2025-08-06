import { menus } from '@/config.json'
import { createContext, useContext, useState, forwardRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const contentVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    x: -20, // 从20改为-20，让菜单从左侧进入
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function HeaderDrawer({ zIndex = 999 }: { zIndex?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const overlayZIndex = zIndex - 1
  const contentZIndex = zIndex

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <TriggerButton />
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-transparent"
                style={{ zIndex: overlayZIndex }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              ></motion.div>
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed top-16 left-4 bg-primary rounded-xl shadow-xl p-2 w-48 border border-secondary" // 将right-4改为left-4
                style={{ zIndex: contentZIndex }}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <DrawerContext.Provider
                  value={{
                    dismiss() {
                      setIsOpen(false)
                    },
                  }}
                >
                  <DrawerContentImpl />
                </DrawerContext.Provider>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

const TriggerButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button
      ref={ref}
      className="size-9 rounded-full shadow-lg shadow-zinc-800/5 border border-primary bg-white/50 dark:bg-zinc-800/50 backdrop-blur"
      type="button"
      aria-label="Open menu"
      {...props}
    >
      <i className="iconfont icon-menu"></i>
    </button>
  )
})

function DrawerContentImpl() {
  const { dismiss } = useContext(DrawerContext)

  return (
    <ul className="space-y-1">
      {menus.map((menu) => (
        <motion.li key={menu.name} variants={menuItemVariants}>
          <a 
            className="flex items-center p-2 space-x-3 rounded-lg hover:bg-secondary transition-colors"
            href={menu.link} 
            onClick={dismiss}
          >
            <i className={clsx('iconfont', menu.icon)}></i>
            <span>{menu.name}</span>
          </a>
        </motion.li>
      ))}
    </ul>
  )
}

const DrawerContext = createContext<{ dismiss(): void }>(null!)
