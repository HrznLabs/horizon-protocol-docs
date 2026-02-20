from playwright.sync_api import sync_playwright

def verify_tooltip():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")

            # Wait for content to load
            print("Waiting for page load...")
            page.wait_for_selector("text=Deployed on Base Sepolia", timeout=10000)

            # Scroll to Deployments section
            deployments_header = page.get_by_text("Deployed on Base Sepolia")
            deployments_header.scroll_into_view_if_needed()

            # Find a copy button. It has aria-label="Copy address"
            # Use first copy button
            copy_button = page.locator('button[aria-label="Copy address"]').first

            print("Hovering over button...")
            # Hover over it
            copy_button.hover()

            # Wait for tooltip transition (0.2s)
            page.wait_for_timeout(1000)

            # Take screenshot of the button area to verify tooltip
            # We need to capture enough area above the button
            # Let's verify the tooltip element exists first (it's a pseudo element so we can't select it directly with playwright selectors easily, but we can verify visual via screenshot)

            # Screenshot of the card
            # The structure is contractCard -> addressWrapper -> CopyButton
            card = copy_button.locator("xpath=../..")

            card.screenshot(path="verification_tooltip.png")

            print("Screenshot taken: verification_tooltip.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_tooltip()
