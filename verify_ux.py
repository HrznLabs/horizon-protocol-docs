import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Connecting to localhost:3000...")
            page.goto("http://localhost:3000")
            print("Connected.")

            # Locate the section containing the cards
            # We can find it by looking for the unique text in the first card description
            quick_links_section = page.locator('section').filter(has_text="Explore MissionEscrow").first

            # Locate the card link within that section
            card_link = quick_links_section.locator('a[href="/docs/architecture/smart-contracts"]').first

            if card_link.count() == 0:
                print("Card link not found!")
            else:
                print("Found card link.")

                # Check computed style to ensure it is display: block
                display = card_link.evaluate("element => window.getComputedStyle(element).display")
                print(f"Card display style: {display}")

                # Verify it contains the CTA button
                cta = card_link.locator(".cardCta_src-pages-index-module") # CSS modules mangle class names?
                # Actually, Docusaurus CSS modules usually result in `className_hash`.
                # We can check if it contains the text "View Contracts" inside a span/div
                cta_text = card_link.locator("span, div").filter(has_text="View Contracts")
                if cta_text.count() > 0:
                    print("Found CTA text inside card link.")
                else:
                    print("CTA text not found inside card link!")

                # Hover to trigger styles
                card_link.hover()
                time.sleep(1) # Wait for transition

                # Screenshot the section
                quick_links_section.screenshot(path="verification_quicklinks.png")
                print("Screenshot taken.")

                # Verify navigation
                card_link.click()
                page.wait_for_url("**/docs/architecture/smart-contracts")
                print("Navigation successful!")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
