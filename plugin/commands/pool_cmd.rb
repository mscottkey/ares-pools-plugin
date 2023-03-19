module AresMUSH
  module Pools
    class PoolCmd
      include CommandHandler

      attr_accessor :name

      def parse_args
        self.name = !cmd.args ? enactor_name : titlecase_arg(cmd.args)
      end
        
      def handle
         pool_name =  Global.read_config("pools", "pool_name")
         ClassTargetFinder.with_a_character(self.name, client, enactor) do |model|
           message = t('pools.show_pool_self', :name => self.name, :pool_name => pool_name, :pool => model.pool )
           client.emit_ooc message
         end
      end
    end
  end
end