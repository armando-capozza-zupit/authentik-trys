# Generated by Django 5.0.3 on 2024-04-02 05:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("authentik_rbac", "0003_alter_systempermission_options"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="systempermission",
            options={
                "default_permissions": (),
                "managed": False,
                "permissions": [
                    ("view_system_info", "Can view system info"),
                    ("view_system_tasks", "Can view system tasks"),
                    ("run_system_tasks", "Can run system tasks"),
                    ("access_admin_interface", "Can access admin interface"),
                    (
                        "access_admin_interface_only_users",
                        "Can access admin interface (only users)",
                    ),
                    ("view_system_settings", "Can view system settings"),
                    ("edit_system_settings", "Can edit system settings"),
                ],
                "verbose_name": "System permission",
                "verbose_name_plural": "System permissions",
            },
        ),
    ]
