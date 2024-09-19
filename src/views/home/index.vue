<template>
   <div>
      <el-container>
         <el-header>
            <el-dropdown split-button type="primary">
               {{ buttonName }}
               <template #dropdown>
                  <el-dropdown-menu>
                     <el-scrollbar height="400px">
                        <el-dropdown-item v-for="provider in providers" :key="provider.tenantId"
                           @click="handleClick(provider)">
                           {{ provider.name }}
                        </el-dropdown-item>
                     </el-scrollbar>
                  </el-dropdown-menu>
               </template>
            </el-dropdown>
            <el-button type="primary" @click="handleAdd">新增</el-button>
         </el-header>
         <el-main class="main">
            <div @click="handleClickPicture" v-if="!showForm">
               <img src="../../assets/login.jpeg" style="width: 600px;" alt="Main Image" />
            </div>
            <h3 v-if="!providers.length && !showText">该接入商还未添加过配置，点击添加新配置</h3>
            <!-- 编辑的表单 -->
            <el-form v-else-if="showForm && !isAdd" :disabled="disabled">
               <h2>编辑B2C配置</h2>
               <!-- 表单内容 -->
               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-form>
                        <el-form-item label="部署类型">
                           <el-radio-group v-model="editForm.deployType" @change="handleChange">
                              <el-radio :value=0>SaaS</el-radio>
                              <el-radio :value=1>独立部署</el-radio>
                           </el-radio-group>
                        </el-form-item>
                     </el-form>
                     <el-form>
                        <el-form-item label="是否启用">
                           <el-radio-group v-model="editForm.isEnable">
                              <el-radio :value=true>是</el-radio>
                              <el-radio :value=false>否</el-radio>
                           </el-radio-group>
                        </el-form-item>
                     </el-form>
                     <el-form-item label="AzureTenantId">
                        <el-input v-model="editForm.azureTenantId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientId">
                        <el-input v-model="editForm.graphClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientSecret">
                        <el-input v-model="editForm.graphClientSecret"></el-input>
                     </el-form-item>
                     <el-form-item label="TenantId">
                        <el-input v-model="editForm.tenantId"></el-input>
                     </el-form-item>
                     <!-- 其他表单项 -->
                  </el-col>
                  <el-col :span="12">
                     <!-- 其他表单项 -->
                     <el-form-item label="SPAApiScopes">
                        <el-input v-model="editForm.spaApiScopes"></el-input>
                     </el-form-item>
                     <el-form-item label="SPABindDomain">
                        <el-input v-model="editForm.spaBindDomain"></el-input>
                     </el-form-item>
                     <el-form-item label="SPAClientId">
                        <el-input v-model="editForm.spaClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiAud">
                        <el-input v-model="editForm.webApiAud"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiClientId">
                        <el-input v-model="editForm.webApiClientId"></el-input>
                     </el-form-item>
                  </el-col>
               </el-row>
               <h3>Polices</h3>

               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-card>
                        <el-form :disabled="disabled">
                           <el-form-item label="clientId">
                              <el-input v-model="editForm.policies.clientId"></el-input>
                           </el-form-item>
                           <el-form-item label="names_signUpSignIn">
                              <el-input v-model="editForm.policies.names_signUpSignIn"></el-input>
                           </el-form-item>
                           <el-form-item label="apiScopes">
                              <el-input v-model="editForm.policies.apiScopes"></el-input>
                           </el-form-item>

                           <!-- 表单内容 -->
                        </el-form>
                     </el-card>
                  </el-col>
                  <el-col :span="12">
                     <el-card>
                        <el-form :disabled="disabled">
                           <el-form-item label="authorityDomain">
                              <el-input v-model="editForm.policies.authorityDomain"></el-input>
                           </el-form-item>
                           <el-form-item label="names_editProfile">
                              <el-input v-model="editForm.policies.names_editProfile"></el-input>
                           </el-form-item>
                           <!-- 表单内容 -->
                        </el-form>
                     </el-card>
                  </el-col>
               </el-row>
               <el-form :disabled="disabled">
                  <el-form-item label="authorities_signUpSignIn_authority" style="margin-top: 10px;">
                     <el-input v-model="editForm.policies.authorities_signUpSignIn_authority"></el-input>
                  </el-form-item>
                  <el-form-item label="authorities_editProfile_authority">
                     <el-input v-model="editForm.policies.authorities_editProfile_authority"></el-input>
                  </el-form-item>
               </el-form>
               <el-form>
                  <el-form-item style="float: right;">
                     <el-button type="primary" @click="submitForm">修改</el-button>
                     <el-button @click="cancelEditForm">取消</el-button>
                  </el-form-item>
               </el-form>
            </el-form>
            <!-- 新增的表单 -->
            <el-form v-if="showForm && isAdd" :disabled="disabled1">
               <h2>新增B2C配置</h2>
               <!-- 表单内容 -->
               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-form>
                        <el-form-item label="部署类型">
                           <el-radio-group v-model="addForm.deployType" @change="handleChange1">
                              <el-radio :value=0>SaaS</el-radio>
                              <el-radio :value=1>独立部署</el-radio>
                           </el-radio-group>
                        </el-form-item>
                     </el-form>
                     <el-form>
                        <el-form-item label="是否启用">
                           <el-radio-group v-model="addForm.isEnable">
                              <el-radio :value=true>是</el-radio>
                              <el-radio :value=false>否</el-radio>
                           </el-radio-group>
                        </el-form-item>
                     </el-form>
                     <el-form-item label="AzureTenantId">
                        <el-input v-model="addForm.azureTenantId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientId">
                        <el-input v-model="addForm.graphClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientSecret">
                        <el-input v-model="addForm.graphClientSecret"></el-input>
                     </el-form-item>
                     <el-form-item label="TenantId">
                        <el-input v-model="addForm.tenantId"></el-input>
                     </el-form-item>
                     <!-- 其他表单项 -->
                  </el-col>
                  <el-col :span="12">
                     <!-- 其他表单项 -->
                     <el-form-item label="SPAApiScopes">
                        <el-input v-model="addForm.spaApiScopes"></el-input>
                     </el-form-item>
                     <el-form-item label="SPABindDomain">
                        <el-input v-model="addForm.spaBindDomain"></el-input>
                     </el-form-item>
                     <el-form-item label="SPAClientId">
                        <el-input v-model="addForm.spaClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiAud">
                        <el-input v-model="addForm.webApiAud"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiClientId">
                        <el-input v-model="addForm.webApiClientId"></el-input>
                     </el-form-item>
                  </el-col>
               </el-row>
               <h3>Polices</h3>

               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-card>
                        <el-form :disabled="disabled1">
                           <el-form-item label="clientId">
                              <el-input v-model="addForm.policies.clientId"></el-input>
                           </el-form-item>
                           <el-form-item label="names_signUpSignIn">
                              <el-input v-model="addForm.policies.names_signUpSignIn"></el-input>
                           </el-form-item>
                           <el-form-item label="apiScopes">
                              <el-input v-model="addForm.policies.apiScopes"></el-input>
                           </el-form-item>

                           <!-- 表单内容 -->
                        </el-form>
                     </el-card>
                  </el-col>
                  <el-col :span="12">
                     <el-card>
                        <el-form :disabled="disabled1">
                           <el-form-item label="authorityDomain">
                              <el-input v-model="addForm.policies.authorityDomain"></el-input>
                           </el-form-item>
                           <el-form-item label="names_editProfile">
                              <el-input v-model="addForm.policies.names_editProfile"></el-input>
                           </el-form-item>
                           <!-- 表单内容 -->
                        </el-form>
                     </el-card>
                  </el-col>
               </el-row>
               <el-form :disabled="disabled1">
                  <el-form-item label="authorities_signUpSignIn_authority" style="margin-top: 10px;">
                     <el-input v-model="addForm.policies.authorities_signUpSignIn_authority"></el-input>
                  </el-form-item>
                  <el-form-item label="authorities_editProfile_authority">
                     <el-input v-model="addForm.policies.authorities_editProfile_authority"></el-input>
                  </el-form-item>
               </el-form>
               <el-form>
                  <el-form-item style="float: right;">
                     <el-button type="primary" @click="submitForm">新增</el-button>
                     <el-button @click="cancelAddForm">取消</el-button>
                  </el-form-item>
               </el-form>
            </el-form>
         </el-main>
      </el-container>

   </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getAccessProvider, addAccessProvider, updateAccessProvider, getSaaSAccessProviderTemplate } from '../../api/home';
import { toRaw } from 'vue';
import axios from 'axios';

const showForm = ref(false)
const showPicture = ref(true)
const showText = ref(false)
const buttonName = ref('请选择接入商')
const disabled = ref(false)
const disabled1 = ref(false)

const isAdd = ref(false)
const id = ref('')

const editForm = ref({
   azureTenantId: '',
   category: '',
   deployType: 1,
   graphClientId: '',
   graphClientSecret: '',
   isEnable: true,
   id: '',
   policies: {
      apiScopes: [],
      authorities_editProfile_authority: '',
      authorities_signUpSignIn_authority: '',
      authorityDomain: '',
      clientId: '',
      names_editProfile: '',
      names_signUpSignIn: ''
   },
   spaApiScopes: [],
   spaBindDomain: '',
   spaClientId: '',
   tenantId: '',
   webApiAud: '',
   webApiClientId: '',
})

const addForm = ref({
   azureTenantId: '',
   category: '',
   deployType: 1,
   graphClientId: '',
   graphClientSecret: '',
   isEnable: true,
   policies: {
      apiScopes: [],
      authorities_editProfile_authority: '',
      authorities_signUpSignIn_authority: '',
      authorityDomain: '',
      clientId: '',
      names_editProfile: '',
      names_signUpSignIn: ''
   },
   spaApiScopes: [],
   spaBindDomain: '',
   spaClientId: '',
   tenantId: '',
   webApiAud: '',
   webApiClientId: '',
})

const SaaSAccessProviderTemplate = ref({
   azureTenantId: '',
   category: '',
   deployType: 1,
   graphClientId: '',
   graphClientSecret: '',
   isEnable: true,
   policies: {
      apiScopes: [],
      authorities_editProfile_authority: '',
      authorities_signUpSignIn_authority: '',
      authorityDomain: '',
      clientId: '',
      names_editProfile: '',
      names_signUpSignIn: ''
   },
   spaApiScopes: [],
   spaBindDomain: '',
   spaClientId: '',
   tenantId: '',
   webApiAud: '',
   webApiClientId: '',
})

interface Provider {
   tenantId: string;
   name: string;
}

const providers = reactive<Provider[]>([])

// 点击图片的方法
const handleClickPicture = () => {
   // 如果有接入商，但未选择，则不做处理
   if (providers.length > 0 && buttonName.value === '请选择接入商') {
      return
   }
   showPicture.value = false
   showForm.value = true
   showText.value = true
   isAdd.value = true
   // 判断radio的值，如果为0，则表单所有选项禁止输入
   if (editForm.value.deployType === 0) {
      disabled.value = true
   }
}

const handleClick = (data: any) => {
   console.log("点击切换");
   console.log(data.tenantId);
   showForm.value = true
   buttonName.value = data.name
   GetAccessProvider(data.tenantId);

   // 如果form中的deploymentType为1，则表单所有选项禁止输入
   // if (editForm.value.deployType == 1) {
   //    disabled.value = true
   // } else
   //    disabled.value = false
}

const submitForm = () => {
   // 处理表单提交逻辑
   console.log(toRaw(editForm.value));
   showForm.value = false
   // 新增逻辑
   // toRaw(form.value).id = Math.random().toString(36).substring(2) + Date.now().toString(36);
   // console.log(toRaw(form.value));
   // console.log("操");
   // AddAccessProvider(JSON.stringify(toRaw(form.value)));
   // 修改逻辑
   // toRaw(form.value).id = '1'

   if (isAdd.value) {
      // toRaw(editForm.value).id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      addForm.value.policies.apiScopes = [addForm.value.policies.apiScopes] as any;
      addForm.value.spaApiScopes = [addForm.value.spaApiScopes] as any;
      addForm.value.category = 'AccessProvider';

      AddAccessProvider(JSON.stringify(toRaw(addForm.value)));
   } else {
      // toRaw(editForm.value).id = '1'
      // apiScopes和spaApiScopes需要处理成数组
      editForm.value.policies.apiScopes = [editForm.value.policies.apiScopes] as any;
      editForm.value.spaApiScopes = [editForm.value.spaApiScopes] as any;
      editForm.value.category = 'AccessProvider';
      if (disabled.value) {
         editForm.value.deployType = 0
      }
      else {
         editForm.value.deployType = 1
      }

      UpdateAccessProvider(JSON.stringify(toRaw(editForm.value)));
   }
}

const cancelEditForm = () => {
   // 处理表单取消逻辑
   showForm.value = false
   // 清空表单
   editForm.value = {
      azureTenantId: '',
      category: '',
      deployType: 1,
      graphClientId: '',
      graphClientSecret: '',
      isEnable: true,
      id: '',
      policies: {
         apiScopes: [],
         authorities_editProfile_authority: '',
         authorities_signUpSignIn_authority: '',
         authorityDomain: '',
         clientId: '',
         names_editProfile: '',
         names_signUpSignIn: ''
      },
      spaApiScopes: [],
      spaBindDomain: '',
      spaClientId: '',
      tenantId: '',
      webApiAud: '',
      webApiClientId: '',
   }
   buttonName.value = '请选择接入商'
}


const cancelAddForm = () => {
   // 处理表单取消逻辑
   showForm.value = false
   // 清空表单
   addForm.value = {
      azureTenantId: '',
      category: '',
      deployType: 1,
      graphClientId: '',
      graphClientSecret: '',
      isEnable: true,
      policies: {
         apiScopes: [],
         authorities_editProfile_authority: '',
         authorities_signUpSignIn_authority: '',
         authorityDomain: '',
         clientId: '',
         names_editProfile: '',
         names_signUpSignIn: ''
      },
      spaApiScopes: [],
      spaBindDomain: '',
      spaClientId: '',
      tenantId: '',
      webApiAud: '',
      webApiClientId: '',
   }
   buttonName.value = '请选择接入商'
}

const AddAccessProvider = (data: any) => {
   addAccessProvider(data).then(response => {
      console.log(response);
      // 在这里执行你的操作
      // 将response.data赋值给form

      if (response.status == 200) {

         ElMessage.success('新增成功');
         // 等2秒刷新页面
         setTimeout(() => {
            // location.reload();
         }, 2000);
      } else {

         ElMessage.error('新增失败');
      }
   }).catch(error => {
      console.log(error);
   })
}

const UpdateAccessProvider = async (data: any) => {
   updateAccessProvider(data).then(response => {
      console.log(response);
      // 在这里执行你的操作
      // 将response.data赋值给form

      if (response.status == 200) {

         ElMessage.success('修改成功');
         // 等2秒刷新页面
         setTimeout(() => {
            // location.reload();
         }, 2000);
      } else {

         ElMessage.error('修改失败');
      }
   }).catch(error => {
      console.log(error);
   })
}

const GetAccessProvider = (tenantId: string) => {
   getAccessProvider(tenantId).then(response => {
      // 在这里执行你的操作
      // 如果response.data中isEnable为ture，则改成1
      // if (response.data.isEnable) {
      //    response.data.isEnable = 1
      // } else {
      //    response.data.isEnable = 0
      // }
      // 将response.data赋值给form
      editForm.value = {
         azureTenantId: response.data.azureTenantId,
         category: response.data.category,
         deployType: response.data.deployType,
         graphClientId: response.data.graphClientId,
         graphClientSecret: response.data.graphClientSecret,
         isEnable: response.data.isEnable,
         id: response.data.id,
         policies: {
            apiScopes: response.data.policies.apiScopes[0],
            authorities_editProfile_authority: response.data.policies.authorities_editProfile_authority,
            authorities_signUpSignIn_authority: response.data.policies.authorities_signUpSignIn_authority,
            authorityDomain: response.data.policies.authorityDomain,
            clientId: response.data.policies.clientId,
            names_editProfile: response.data.policies.names_editProfile,
            names_signUpSignIn: response.data.policies.names_signUpSignIn
         },
         spaApiScopes: response.data.spaApiScopes[0],
         spaBindDomain: response.data.spaBindDomain,
         spaClientId: response.data.spaClientId,
         tenantId: tenantId,
         webApiAud: response.data.webApiAud,
         webApiClientId: response.data.webApiClientId
      }
      if (editForm.value.deployType == 1) {
         disabled.value = false
      } else {
         disabled.value = true
      }
      isAdd.value = false
   }).catch(error => {
      console.log('There was a problem with your fetch operation:', error);
      // 在这里处理错误
   });
}

// const GetAllAccessProvider = async () => {
//    getAllAccessProvider().then(response => {
//       console.log("这里");
//       console.log(response.data);
//       // 在这里执行你的操作
//       // 将response.data赋值给form
//       for (let i = 0; i < response.data.length; i++) {
//          providers.push({
//             tenantId: response.data[i].tenantId,
//             name: ''
//          });
//       }
//       console.log("这里");
//       console.log(providers);
//    }).catch(error => {
//       console.error('There was a problem with your fetch operation:', error);
//       // 在这里处理错误
//    });
// }

const handleChange = () => {
   // 如果form.deployType的值为'1'，则为独立部署，则disabled为false，否则为true
   if (editForm.value.deployType === 1) {
      disabled.value = false;
   } else {
      disabled.value = true;
   }
}

const handleChange1 = () => {
   if (addForm.value.deployType === 1) {
      disabled1.value = true;
   } else {
      disabled1.value = false;
   }
}

const handleAdd = () => {
   showForm.value = true;
   isAdd.value = true;
   addForm.value.deployType = 0;
}

const GetSaaSAccessProviderTemplate = () => {
   getSaaSAccessProviderTemplate().then(response => {
      console.log("这里是SaaS模板");
      console.log(response.data);
      // 在这里执行你的操作
      // 将response.data赋值给form
      SaaSAccessProviderTemplate.value = {
         azureTenantId: response.data.azureTenantId,
         category: response.data.category,
         deployType: response.data.deployType,
         graphClientId: response.data.graphClientId,
         graphClientSecret: response.data.graphClientSecret,
         isEnable: response.data.isEnable,
         policies: {
            apiScopes: response.data.policies.apiScopes[0],
            authorities_editProfile_authority: response.data.policies.authorities_editProfile_authority,
            authorities_signUpSignIn_authority: response.data.policies.authorities_signUpSignIn_authority,
            authorityDomain: response.data.policies.authorityDomain,
            clientId: response.data.policies.clientId,
            names_editProfile: response.data.policies.names_editProfile,
            names_signUpSignIn: response.data.policies.names_signUpSignIn
         },
         spaApiScopes: response.data.spaApiScopes[0],
         spaBindDomain: response.data.spaBindDomain,
         spaClientId: response.data.spaClientId,
         tenantId: response.data.tenantId,
         webApiAud: response.data.webApiAud,
         webApiClientId: response.data.webApiClientId
      }
      console.log("你在看哪里");
      console.log(SaaSAccessProviderTemplate.value);
   })
}

// 获得SaaS租户列表
const getSaaSTenantList = async () => {
   const instance = axios.create({
      baseURL: 'https://paas-mgw.apim.xmindit.com/saas-uuas/tenantlist', // 设置基础URL
      timeout: 5000, // 设置请求超时时间
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'saas-uuas': '4604809207774a5d9aa18d5c8df88aac'
      }
   });
   instance.post('', {}).then(response => {
      console.log("这里是SaaS租户列表");
      console.log(response.data);
      // 在这里执行你的操作
      // 将response.data赋值给providers
      for (let i = 0; i < response.data.data.length; i++) {
         providers.push({
            tenantId: response.data.data[i].id,
            name: response.data.data[i].name,
         });
      }
      console.log(providers);
   })
}

onMounted(() => {
   // GetAllAccessProvider();
   // GetAccessProvider('1');
   GetSaaSAccessProviderTemplate();
   getSaaSTenantList();
})

</script>

<style scoped>
.el-header {
   display: flex;
   justify-content: flex-start;
   align-items: center;
   background-color: #fff;
   border-bottom: 1px solid #e0e0e0;
}

.el-dropdown {
   margin-right: auto;
   /* 将下拉菜单推到右侧 */
}
</style>