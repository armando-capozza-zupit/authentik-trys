import "@goauthentik/elements/EmptyState";
import "@goauthentik/flow/FormStatic";
import { BaseStage } from "@goauthentik/flow/stages/base";

import { msg } from "@lit/localize";
import { CSSResult, TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";

import PFButton from "@patternfly/patternfly/components/Button/button.css";
import PFForm from "@patternfly/patternfly/components/Form/form.css";
import PFFormControl from "@patternfly/patternfly/components/FormControl/form-control.css";
import PFList from "@patternfly/patternfly/components/List/list.css";
import PFLogin from "@patternfly/patternfly/components/Login/login.css";
import PFTitle from "@patternfly/patternfly/components/Title/title.css";
import PFBase from "@patternfly/patternfly/patternfly-base.css";
import PFSpacing from "@patternfly/patternfly/utilities/Spacing/spacing.css";

import {
    ConsentChallenge,
    ConsentChallengeResponseRequest,
    ConsentPermission,
} from "@goauthentik/api";

@customElement("ak-stage-consent")
export class ConsentStage extends BaseStage<ConsentChallenge, ConsentChallengeResponseRequest> {
    static get styles(): CSSResult[] {
        return [PFBase, PFLogin, PFList, PFForm, PFSpacing, PFFormControl, PFTitle, PFButton];
    }

    renderPermissions(perms: ConsentPermission[]): TemplateResult {
        return html`${perms.map((permission) => {
            if (permission.name === "") {
                return html``;
            }
            // Special case for openid Scope
            if (permission.id === "openid") {
                return html``;
            }
            return html`<li data-permission-code="${permission.id}">${permission.name}</li>`;
        })}`;
    }

    renderNoPrevious(): TemplateResult {
        return html`
            <div class="pf-c-form__group">
                <h3 id="header-text" class="pf-c-title pf-m-xl pf-u-mb-xl">
                    ${this.challenge.headerText}
                </h3>
                ${this.challenge.permissions.length > 0
                    ? html`
                          <p class="pf-u-mb-sm">
                              ${msg("Application requires following permissions:")}
                          </p>
                          <ul class="pf-c-list" id="permissions">
                              ${this.renderPermissions(this.challenge.permissions)}
                          </ul>
                      `
                    : html``}
            </div>
        `;
    }

    renderAdditional(): TemplateResult {
        return html`
            <div class="pf-c-form__group">
                <h3 id="header-text" class="pf-c-title pf-m-xl pf-u-mb-xl">
                    ${this.challenge.headerText}
                </h3>
                ${this.challenge.permissions.length > 0
                    ? html`
                          <p class="pf-u-mb-sm">
                              ${msg("Application already has access to the following permissions:")}
                          </p>
                          <ul class="pf-c-list" id="permissions">
                              ${this.renderPermissions(this.challenge.permissions)}
                          </ul>
                      `
                    : html``}
            </div>
            <div class="pf-c-form__group pf-u-mt-md">
                ${this.challenge.additionalPermissions.length > 0
                    ? html`
                          <strong class="pf-u-mb-sm">
                              ${msg("Application requires following new permissions:")}
                          </strong>
                          <ul class="pf-c-list" id="permissions">
                              ${this.renderPermissions(this.challenge.additionalPermissions)}
                          </ul>
                      `
                    : html``}
            </div>
        `;
    }

    firstUpdated() {
    // Wait for the element to be rendered
        setTimeout(() => {
            this.submitForm(new Event("submit"), {
                token: this.challenge?.token,
            });
        }, 0);
}

    render(): TemplateResult {
        return html`
            <ak-empty-state ?loading="${true}" header=${msg("Loading")}>
            </ak-empty-state>`;
    }
}
