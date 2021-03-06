"""Api for Heroes model."""
from api_helpers import login_required, ownership_required, get_user_from_token
from endpoints_proto_datastore.ndb import EndpointsModel
from google.appengine.api import users
# from google.appengine.api import ndb
from google.appengine.ext import ndb


from protorpc import remote
import endpoints
import logging
import os

class Hero(EndpointsModel):
    """Hero model."""
    _message_fields_schema = ('id', 'name', 'owner', 'blob_key', 'created')

    name = ndb.StringProperty()
    owner = ndb.StringProperty()
    blob_key = ndb.BlobKeyProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

@endpoints.api(
    name='heroes_api',
    version='v1',
    description='Heroes API',
    issuers={'firebase': endpoints.Issuer(
        'https://securetoken.google.com/ng-md-gae-boilerplate',
        'https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com')},
    audiences={"firebase": ['ng-md-gae-boilerplate']},
    allowed_client_ids=["firebase_auth"])
class HeroesApi(remote.Service):
    """Def of endpoints."""

    # GET /_ah/api/heroes_api/v1/heroes
    @Hero.query_method(path='heroes',
                       name='heroes.list')
    def hero_list(self, hero_list):
        logging.info("-------------------- hero_list: {}".format(hero_list))
        """Get list."""
        return hero_list

    # GET /_ah/api/heroes_api/v1/hero/{id}
    @Hero.method(request_fields=('id',),
                 path='hero/{id}',
                 http_method='GET',
                 name='hero.get')
    def hero_get(self, hero):
        """Get single."""
        if not hero.from_datastore:
            raise endpoints.NotFoundException('Hero not found.')
        return hero

    # POST /_ah/api/heroes_api/v1/heroes
    @Hero.method(path='heroes',
                 http_method='POST',
                 name='heroes.insert')
    @login_required('You have to be logged in to insert new heroes!')
    def hero_insert(self, hero):
        """Insert."""
        user = get_user_from_token(self)
        hero.owner = user
        hero.blob_key = None
        hero.put()
        return hero

    # PUT /_ah/api/heroes_api/v1/hero/{id}
    @Hero.method(path='hero/{id}',
                 http_method='PUT',
                 name='hero.update')
    @ownership_required('You cannot change a hero you don\'t own!')
    @login_required('You have to be logged in to change a hero!')
    def hero_update(self, hero):
        """Update."""
        hero.put()
        return hero

    # DELETE /_ah/api/heroes_api/v1/hero/{id}
    @Hero.method(path='hero/{id}',
                 http_method='DELETE',
                 name='hero.delete')
    @ownership_required('You cannot delete a hero you don\'t own!')
    @login_required('You have to be logged in to delete a hero!')
    def hero_delete(self, hero):
        """Delete."""
        hero.key.delete()
        return hero