"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=uhmh%1)*^l_pk51fc00#t6ckt=^f9j)li9^&-=0b36awcfyg7'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'factor-backend-1480867072.sa-east-1.elb.amazonaws.com',
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    'factor-cadusaboya.loca.lt',
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'accounts',
    'tasks',
    'rest_framework',
    'rest_framework_simplejwt',
]



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGIN_REGEXES = [
    'https://factor-cadusaboya.loca.lt',
    r'^https?://jqpzlmg-cadusaboya-8081\.exp\.direct$',
    'exp://jqpzlmg-cadusaboya-8081.exp.direct',
    'http://factor-cadusaboya.loca.lt',
    'https://cadusaboya.github.io'
]


ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',  # Your database name
        'USER': 'postgres',      # Your RDS master username
        'PASSWORD': 'Bds0I1FawnHANWUTcEyC',  # Your RDS master password
        'HOST': 'factor.cfw6y6mikr73.sa-east-1.rds.amazonaws.com',
        'PORT': '5432',
    }
}

AUTH_USER_MODEL = 'accounts.User'

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Configure JWT authentication settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Set the access token expiration time to 15 minutes
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # Set the refresh token expiration time to 1 day
}

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# EMAIL

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtpout.secureserver.net'  # O host SMTP fornecido pelo seu provedor de email
EMAIL_PORT = 465  # Porta SMTP, geralmente 465 para SSL
EMAIL_USE_SSL = True  # Use SSL para segurança
EMAIL_USE_TLS = False  # TLS deve ser False se SSL for True
EMAIL_HOST_USER = 'suporte@factorpa.xyz'  # Seu email completo
EMAIL_HOST_PASSWORD = 'AbCdEfGhI'  # A senha do seu email
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER