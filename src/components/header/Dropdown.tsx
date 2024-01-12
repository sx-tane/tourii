import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type DropdownItem = {
  href: string;
  label: string;
};

type DropdownProps = {
  isOpen: boolean;
  items: DropdownItem[];
};

const Dropdown: React.FC<DropdownProps> = ({ isOpen, items }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute z-10 mt-2 w-full rounded-md bg-charcoal p-2 shadow-xl">
          {items.map((dropdownItem) => (
            <Link
              key={dropdownItem.href}
              href={dropdownItem.href}
              passHref
              target="_blank"
            >
              <div className="block p-2 text-xs font-medium tracking-widest text-white">
                {dropdownItem.label}
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Dropdown;
