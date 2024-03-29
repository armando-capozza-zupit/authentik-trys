"""authentik Session Views"""

from typing import Any

from django.shortcuts import get_object_or_404, redirect
from django.views.generic.base import TemplateView

from authentik.core.models import Application
from authentik.lib.utils.urls import redirect_with_qs
from authentik.policies.views import PolicyAccessView


class EndSessionView(TemplateView, PolicyAccessView):
    """Allow the client to end the Session"""

    def resolve_provider_application(self):
        self.application = get_object_or_404(Application, slug=self.kwargs["application_slug"])

    def get(self, request, *args, **kwargs):
        return redirect('authentik_flows:default-invalidation')
