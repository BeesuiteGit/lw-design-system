import {
  HeroSection,
  GlassCard,
  AnimatedButton,
  FeatureGrid,
  PageTransition,
  ScrollFadeSection,
  ToastContainer,
  useToast,
  type Feature,
} from '@beesuitegit/design-system';

const features: Feature[] = [
  { title: 'Glassmorphism', description: 'Frosted-glass surfaces with subtle gradients.', icon: '✨' },
  { title: 'Responsive', description: 'Mobile-first, breakpoints at 640/768/1024/1280.', icon: '📱' },
  { title: 'Accessible', description: 'WCAG AAA, prefers-reduced-motion respected.', icon: '♿' },
];

export function App() {
  const { toasts, addToast, removeToast } = useToast();
  const toastsForContainer = toasts.map((t) => ({ ...t, onDismiss: () => removeToast(t.id) }));

  return (
    <PageTransition>
      <HeroSection
        title="Consumer test"
        subtitle="Validates that @beesuitegit/design-system can be installed and used end-to-end from a Vite + React + TS app."
      >
        <AnimatedButton variant="primary" onClick={() => addToast('It works!', 'success')}>
          Trigger toast
        </AnimatedButton>
      </HeroSection>

      <ScrollFadeSection>
        <FeatureGrid features={features} title="What this test covers" />
      </ScrollFadeSection>

      <ScrollFadeSection>
        <section style={{ padding: '4rem 1.5rem' }}>
          <GlassCard accentColor="primary">
            <h2>GlassCard</h2>
            <p>
              If you can read this inside a frosted-glass card with rounded corners, the design tokens
              and CSS modules are loading correctly.
            </p>
            <AnimatedButton variant="primary" onClick={() => addToast('Click registered', 'info')}>
              Animated button
            </AnimatedButton>
          </GlassCard>
        </section>
      </ScrollFadeSection>

      <ToastContainer toasts={toastsForContainer} />
    </PageTransition>
  );
}
