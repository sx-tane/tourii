import Dropdown from "~/components/Dropdown";
import Header from "~/components/Header";

const About = () => {
  return (
    <div>
      <Header />
      <Dropdown
        items={[
          { href: "/link1", label: "Link 1" },
          { href: "/link2", label: "Link 2" },
        ]}
      />
    </div>
  );
};

export default About;
