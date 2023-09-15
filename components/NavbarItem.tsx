interface NavbarItemsProps {
  label: string;
}

const NavbarItem = ({ label }: NavbarItemsProps) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition-all duration-75">
      {label}
    </div>
  );
};

export default NavbarItem;
