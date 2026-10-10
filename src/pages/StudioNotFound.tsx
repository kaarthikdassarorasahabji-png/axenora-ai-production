import { Layout } from "@/components/layout/Layout";
import { Intro, Action } from "@/components/Studio";
export default function StudioNotFound() {
  return (
    <Layout>
      <div className="studio min-h-[65vh]">
        <Intro
          label="404"
          title="This page isn't here."
          text="Explore the Axenora products and services, or get in touch to discuss your project."
        />
        <div className="studio-wrap pb-20">
          <Action to="/solutions">Explore solutions</Action>
        </div>
      </div>
    </Layout>
  );
}
