import type { MetaFunction } from "remix";
import Synth from "../components/Synth";
import SynthInfo from "../components/SynthInfo";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Synth",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  
  return (
    <div className="remix__page">
      <main>
        <Synth />
      </main>
      <aside>
        <SynthInfo />
      </aside>
    </div>
  );
}
