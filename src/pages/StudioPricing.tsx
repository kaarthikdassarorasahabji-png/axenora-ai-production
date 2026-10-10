import { Layout } from "@/components/layout/Layout";
import { Action, Features, FinalCTA, Intro } from "@/components/Studio";
export default function StudioPricing() {
  return (
    <Layout>
      <div className="studio">
        <Intro
          label="Project pricing"
          title="A clear scope. A considered investment."
          text="Choose the starting point that fits your business. Final pricing follows a reviewed proposal, with integrations and recurring provider costs made explicit."
        />
        <section className="studio-wrap studio-services studio-section">
          {[
            {
              title: "Focused automation",
              price: "From INR 29,999",
              items: [
                "One scoped customer or office workflow",
                "Approved business content and rules",
                "Integration and deployment support",
                "Testing and operator handoff",
              ],
            },
            {
              title: "Connected business system",
              price: "From INR 99,999",
              items: [
                "Custom CRM and role-based workspace",
                "Connected backend and database",
                "Customer, order and task workflows",
                "Permissions and rollout verification",
              ],
            },
            {
              title: "Workforce & voice systems",
              price: "Custom proposal",
              items: [
                "Workforce operations or calling requirements",
                "Device or provider integration scope",
                "Access and escalation controls",
                "Agreed rollout and ongoing costs",
              ],
            },
          ].map((plan) => (
            <article className="studio-product" key={plan.title}>
              <p className="studio-label">{plan.price}</p>
              <h2>{plan.title}</h2>
              <Features items={plan.items} />
              <Action>Discuss scope</Action>
            </article>
          ))}
        </section>
        <section className="studio-wrap studio-section">
          <h2>What affects the quote?</h2>
          <p className="studio-lead">
            Channels, integrations, data migration, roles, workflow complexity
            and support requirements. Hosting, model usage, messaging and
            telephony fees are scoped separately. No outcome or search-ranking
            guarantee is included.
          </p>
        </section>
        <FinalCTA />
      </div>
    </Layout>
  );
}
