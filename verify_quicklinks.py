from playwright.sync_api import sync_playwright, expect
import os

def verify(page):
    print("Navigating to homepage...")
    page.goto("http://localhost:3000")

    # Wait for the homepage to load
    page.wait_for_selector(".hero__title")

    # Locate the "Smart Contracts" heading
    smart_contracts_heading = page.get_by_role("heading", name="Smart Contracts")
    expect(smart_contracts_heading).to_be_visible()

    # Verify the structure: Heading should be inside a DIV, not an Anchor
    # This ensures the card is not wrapped in a Link, allowing text selection
    heading_element = smart_contracts_heading.element_handle()
    parent_tag = page.evaluate("(element) => element.parentElement.tagName", heading_element)
    grandparent_tag = page.evaluate("(element) => element.parentElement.parentElement.tagName", heading_element)

    print(f"Parent tag of heading: {parent_tag}")
    print(f"Grandparent tag of heading: {grandparent_tag}")

    # If the parent is an A tag, text selection is blocked (because the whole card is a link).
    # We want the parent to be a DIV (the card container).
    if parent_tag == "A":
        raise Exception("Heading is directly inside an Anchor tag, text selection will be blocked!")

    # Verify the "View Contracts" link is present and inside the card
    view_contracts_link = page.get_by_role("link", name="View Contracts")
    expect(view_contracts_link).to_be_visible()

    # Take screenshot
    screenshot_path = "/home/jules/verification/verification.png"
    os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        finally:
            browser.close()
