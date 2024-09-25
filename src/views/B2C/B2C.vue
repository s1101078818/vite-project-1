<template>
   <div>
      <el-container>
         <el-main class="main">
            <el-form v-if="!IsAdd" :model="EditForm" :rules="rules" ref="formRef">
               <h2 v-loading.fullscreen.lock="loading">编辑B2C配置</h2>
               <!-- 表单内容 -->
               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-form>
                        <el-form-item label="是否启用">
                           <el-radio-group v-model="EditForm.isEnable">
                              <el-radio :value=true>是</el-radio>
                              <el-radio :value=false>否</el-radio>
                           </el-radio-group>
                        </el-form-item>
                     </el-form>
                     <el-form-item label="AzureTenantId" prop="azureTenantId">
                        <el-input v-model="EditForm.azureTenantId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientId" prop="graphClientId">
                        <el-input v-model="EditForm.graphClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientSecret" prop="graphClientSecret">
                        <el-input v-model="EditForm.graphClientSecret"></el-input>
                     </el-form-item>
                     <el-form-item label="TenantId" prop="tenantId">
                        <el-input v-model="EditForm.tenantId" disabled></el-input>
                     </el-form-item>
                     <el-form-item label="JwtKeysUrl" prop="jwtKeysUrl">
                        <el-input v-model="EditForm.jwtKeysUrl"></el-input>
                     </el-form-item>
                     <!-- 其他表单项 -->

                  </el-col>
                  <el-col :span="12">
                     <!-- 其他表单项 -->
                     <el-form-item label="SPAApiScopes" prop="spaApiScopes">
                        <el-input v-model="EditForm.spaApiScopes"></el-input>
                     </el-form-item>
                     <el-form-item label="SPABindDomain" prop="spaBindDomain">
                        <el-input v-model="EditForm.spaBindDomain"></el-input>
                     </el-form-item>
                     <el-form-item label="SPAClientId" prop="spaClientId">
                        <el-input v-model="EditForm.spaClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiAud" prop="webApiAud">
                        <el-input v-model="EditForm.webApiAud"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiClientId" prop="webApiClientId">
                        <el-input v-model="EditForm.webApiClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="JwtOpenConfigUrl" prop="jwtOpenConfigUrl">
                        <el-input v-model="EditForm.jwtOpenConfigUrl"></el-input>
                     </el-form-item>
                  </el-col>
               </el-row>
               <h3>Polices</h3>

               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-form :model="EditForm" :rules="rules" ref="formRef1">
                        <el-form-item label="clientId" prop="policies.clientId">
                           <el-input v-model="EditForm.policies.clientId"></el-input>
                        </el-form-item>
                        <el-form-item label="names_signUpSignIn" prop="policies.names_signUpSignIn">
                           <el-input v-model="EditForm.policies.names_signUpSignIn"></el-input>
                        </el-form-item>
                        <el-form-item label="apiScopes" prop="policies.apiScopes">
                           <el-input v-model="EditForm.policies.apiScopes"></el-input>
                        </el-form-item>
                        <!-- 表单内容 -->
                     </el-form>
                  </el-col>
                  <el-col :span="12">
                     <el-form :model="EditForm" :rules="rules" ref="formRef2">
                        <el-form-item label="authorityDomain" prop="policies.authorityDomain">
                           <el-input v-model="EditForm.policies.authorityDomain"></el-input>
                        </el-form-item>
                        <el-form-item label="names_editProfile" prop="policies.names_editProfile">
                           <el-input v-model="EditForm.policies.names_editProfile"></el-input>
                        </el-form-item>
                        <!-- 表单内容 -->
                     </el-form>
                  </el-col>
               </el-row>
               <el-form :model="EditForm" :rules="rules" ref="formRef3">
                  <el-form-item label="authorities_signUpSignIn_authority" style="margin-top: 10px;"
                     prop="policies.authorities_signUpSignIn_authority">
                     <el-input v-model="EditForm.policies.authorities_signUpSignIn_authority"></el-input>
                  </el-form-item>
                  <el-form-item label="authorities_editProfile_authority"
                     prop="policies.authorities_editProfile_authority">
                     <el-input v-model="EditForm.policies.authorities_editProfile_authority"></el-input>
                  </el-form-item>
               </el-form>
               <el-form>
                  <el-form-item style="float: right;">
                     <el-button type="primary" @click="update">修改</el-button>
                     <el-button @click="cancelEditForm">取消</el-button>
                  </el-form-item>
               </el-form>
            </el-form>


            <!-- 新增的表单 -->
            <el-form v-if="IsAdd" :model="addForm" :rules="rules1" ref="addFormRef">
               <h2 v-loading.fullscreen.lock="loading">新增B2C配置</h2>
               <!-- 表单内容 -->
               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-form>
                        <el-form-item label="是否启用">
                           <el-radio-group v-model="addForm.isEnable">
                              <el-radio :value=true>是</el-radio>
                              <el-radio :value=false>否</el-radio>
                           </el-radio-group>
                        </el-form-item>
                     </el-form>
                     <el-form-item label="AzureTenantId" prop="azureTenantId">
                        <el-input v-model="addForm.azureTenantId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientId" prop="graphClientId">
                        <el-input v-model="addForm.graphClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="GraphClientSecret" prop="graphClientSecret">
                        <el-input v-model="addForm.graphClientSecret"></el-input>
                     </el-form-item>

                     <el-form-item label="TenantId" prop="tenantId">
                        <el-input v-model="addForm.tenantId" disabled></el-input>
                     </el-form-item>
                     <el-form-item label="JwtKeysUrl" prop="jwtKeysUrl">
                        <el-input v-model="addForm.jwtKeysUrl"></el-input>
                     </el-form-item>
                     <!-- 其他表单项 -->

                  </el-col>
                  <el-col :span="12">
                     <!-- 其他表单项 -->
                     <el-form-item label="SPAApiScopes" prop="spaApiScopes">
                        <el-input v-model="addForm.spaApiScopes"></el-input>
                     </el-form-item>
                     <el-form-item label="SPABindDomain" prop="spaBindDomain">
                        <el-input v-model="addForm.spaBindDomain"></el-input>
                     </el-form-item>
                     <el-form-item label="SPAClientId" prop="spaClientId">
                        <el-input v-model="addForm.spaClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiAud" prop="webApiAud">
                        <el-input v-model="addForm.webApiAud"></el-input>
                     </el-form-item>
                     <el-form-item label="WebApiClientId" prop="webApiClientId">
                        <el-input v-model="addForm.webApiClientId"></el-input>
                     </el-form-item>
                     <el-form-item label="JwtOpenConfigUrl" prop="jwtOpenConfigUrl">
                        <el-input v-model="addForm.jwtOpenConfigUrl"></el-input>
                     </el-form-item>
                  </el-col>
               </el-row>
               <h3>Polices</h3>

               <el-row :gutter="20">
                  <el-col :span="12">
                     <el-form :model="addForm" :rules="rules1" ref="addFormRef1">
                        <el-form-item label="clientId" prop="policies.clientId">
                           <el-input v-model="addForm.policies.clientId"></el-input>
                        </el-form-item>
                        <el-form-item label="names_signUpSignIn" prop="policies.names_signUpSignIn">
                           <el-input v-model="addForm.policies.names_signUpSignIn"></el-input>
                        </el-form-item>
                        <el-form-item label="apiScopes" prop="policies.apiScopes">
                           <el-input v-model="addForm.policies.apiScopes"></el-input>
                        </el-form-item>
                        <!-- 表单内容 -->
                     </el-form>
                  </el-col>
                  <el-col :span="12">
                     <el-form :model="addForm" :rules="rules1" ref="addFormRef2">
                        <el-form-item label="authorityDomain" prop="policies.authorityDomain">
                           <el-input v-model="addForm.policies.authorityDomain"></el-input>
                        </el-form-item>
                        <el-form-item label="names_editProfile" prop="policies.names_editProfile">
                           <el-input v-model="addForm.policies.names_editProfile"></el-input>
                        </el-form-item>
                        <!-- 表单内容 -->
                     </el-form>
                  </el-col>
               </el-row>
               <el-form :model="addForm" :rules="rules1" ref="addFormRef3">
                  <el-form-item label="authorities_signUpSignIn_authority" style="margin-top: 10px;"
                     prop="policies.authorities_signUpSignIn_authority">
                     <el-input v-model="addForm.policies.authorities_signUpSignIn_authority"></el-input>
                  </el-form-item>
                  <el-form-item label="authorities_editProfile_authority"
                     prop="policies.authorities_editProfile_authority">
                     <el-input v-model="addForm.policies.authorities_editProfile_authority"></el-input>
                  </el-form-item>
               </el-form>
               <el-form>
                  <el-form-item style="float: right;">
                     <el-button type="primary" @click="add">新增</el-button>
                     <el-button @click="cancelAddForm">取消</el-button>
                  </el-form-item>
               </el-form>
            </el-form>
         </el-main>
      </el-container>
   </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { getAccessProvider, addAccessProvider, updateAccessProvider } from '../../api/home';
import { toRaw } from 'vue';
import { ElForm } from 'element-plus';

const loading = ref(false)

const EditForm = ref({
   azureTenantId: '',
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
   jwtKeysUrl: '',
   jwtOpenConfigUrl: '',
})

const addForm = ref({
   azureTenantId: '',
   category: '',
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
   jwtKeysUrl: '',
   jwtOpenConfigUrl: '',
})

const rules = reactive({
   azureTenantId: [
      { required: true, message: 'AzureTenantId不能为空', trigger: 'blur' }
   ],
   graphClientId: [
      { required: true, message: 'GraphClientId不能为空', trigger: 'blur' }
   ],
   graphClientSecret: [
      { required: true, message: 'GraphClientSecret不能为空', trigger: 'blur' }
   ],
   tenantId: [
      { required: true, message: 'TenantId不能为空', trigger: 'blur' }
   ],
   spaApiScopes: [
      { required: true, message: 'SPAApiScopes不能为空', trigger: 'blur' }
   ],
   spaBindDomain: [
      { required: true, message: 'SPABindDomain不能为空', trigger: 'blur' }
   ],
   spaClientId: [
      { required: true, message: 'SPAClientId不能为空', trigger: 'blur' }
   ],
   webApiAud: [
      { required: true, message: 'WebApiAud不能为空', trigger: 'blur' }
   ],
   webApiClientId: [
      { required: true, message: 'WebApiClientId不能为空', trigger: 'blur' }
   ],
   'policies.clientId': [{
      required: true, message: 'clientId不能为空', trigger: 'blur'
   }],
   'policies.authorityDomain': [{
      required: true, message: 'authorityDomain不能为空', trigger: 'blur'
   }],
   'policies.authorities_signUpSignIn_authority': [{
      required: true, message: 'authorities_signUpSignIn_authority不能为空', trigger: 'blur'
   }],
   'policies.names_signUpSignIn': [{
      required: true, message: 'names_signUpSignIn不能为空', trigger: 'blur'
   }],
   'policies.names_editProfile': [{
      required: true, message: 'names_editProfile不能为空', trigger: 'blur'
   }],
   'policies.authorities_editProfile_authority': [{
      required: true, message: 'authorities_editProfile_authority不能为空', trigger: 'blur'
   }],
   'policies.apiScopes': [{
      required: true, message: 'apiScopes不能为空', trigger: 'blur'
   }],
   jwtKeysUrl: [{
      required: true, message: 'JwtKeysUrl不能为空', trigger: 'blur'
   }],
   jwtOpenConfigUrl: [{
      required: true, message: 'JwtOpenConfigUrl不能为空', trigger: 'blur'
   }]
})

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const formRef1 = ref<InstanceType<typeof ElForm> | null>(null);
const formRef2 = ref<InstanceType<typeof ElForm> | null>(null);
const formRef3 = ref<InstanceType<typeof ElForm> | null>(null);

const rules1 = reactive({
   azureTenantId: [
      { required: true, message: 'AzureTenantId不能为空', trigger: 'blur' }
   ],
   graphClientId: [
      { required: true, message: 'GraphClientId不能为空', trigger: 'blur' }
   ],
   graphClientSecret: [
      { required: true, message: 'GraphClientSecret不能为空', trigger: 'blur' }
   ],
   tenantId: [
      { required: true, message: 'TenantId不能为空', trigger: 'blur' }
   ],
   spaApiScopes: [
      { required: true, message: 'SPAApiScopes不能为空', trigger: 'blur' }
   ],
   spaBindDomain: [
      { required: true, message: 'SPABindDomain不能为空', trigger: 'blur' }
   ],
   spaClientId: [
      { required: true, message: 'SPAClientId不能为空', trigger: 'blur' }
   ],
   webApiAud: [
      { required: true, message: 'WebApiAud不能为空', trigger: 'blur' }
   ],
   webApiClientId: [
      { required: true, message: 'WebApiClientId不能为空', trigger: 'blur' }
   ],
   'policies.clientId': [{
      required: true, message: 'clientId不能为空', trigger: 'blur'
   }],
   'policies.authorityDomain': [{
      required: true, message: 'authorityDomain不能为空', trigger: 'blur'
   }],
   'policies.authorities_signUpSignIn_authority': [{
      required: true, message: 'authorities_signUpSignIn_authority不能为空', trigger: 'blur'
   }],
   'policies.names_signUpSignIn': [{
      required: true, message: 'names_signUpSignIn不能为空', trigger: 'blur'
   }],
   'policies.names_editProfile': [{
      required: true, message: 'names_editProfile不能为空', trigger: 'blur'
   }],
   'policies.authorities_editProfile_authority': [{
      required: true, message: 'authorities_editProfile_authority不能为空', trigger: 'blur'
   }],
   'policies.apiScopes': [{
      required: true, message: 'apiScopes不能为空', trigger: 'blur'
   }],
   jwtKeysUrl: [{
      required: true, message: 'JwtKeysUrl不能为空', trigger: 'blur'
   }],
   jwtOpenConfigUrl: [{
      required: true, message: 'JwtOpenConfigUrl不能为空', trigger: 'blur'
   }]
})

const addFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const addFormRef1 = ref<InstanceType<typeof ElForm> | null>(null);
const addFormRef2 = ref<InstanceType<typeof ElForm> | null>(null);
const addFormRef3 = ref<InstanceType<typeof ElForm> | null>(null);

const JwtKeys = ref([
   {
      kid: '',
      nbf: '',
      use: '',
      kty: '',
      e: '',
      n: ''
   }
])

const JwtOpenConfig = ref({
   issuer: '',
   authorization_endpoint: '',
   token_endpoint: '',
   end_session_endpoint: '',
   jwks_uri: '',
   response_modes_supported: [
   ],
   response_types_supported: [
   ],
   scopes_supported: [
   ],
   subject_types_supported: [
   ],
   id_token_signing_alg_values_supported: [
   ],
   token_endpoint_auth_methods_supported: [
   ],
   claims_supported: [
   ]
})

const IsAdd = ref(false)
const TenantId = ref('')

const props = defineProps({
   editForm: {
      type: Object as () => any
   },
   isAdd: {
      type: Boolean as () => any
   },
   tenantId: {
      type: String as () => any
   },
   jwtOpenConfig: {
      type: Object as () => any
   },
   jwtKeys: {
      type: Object as () => any
   }
});

watch(() => props.editForm, (newVal) => {
   // console.log("EditForm", EditForm.value);
   // console.log('props.editForm changed:', toRaw(newVal));
   EditForm.value = toRaw(newVal);
   // console.log('EditForm updated:', EditForm.value);
}, { deep: true, immediate: true });

watch(() => props.isAdd, (newVal) => {
   console.log("isAdd", IsAdd.value);
   console.log("在这里呢");

   console.log('props.isAdd changed:', toRaw(newVal));
   IsAdd.value = toRaw(newVal);
   console.log('我去你妈的:', IsAdd.value);
   console.log('isAdd updated:', IsAdd.value);
   // 如果是新增，那么将tenantId赋值给addForm
   if (IsAdd.value) {
      addForm.value.id = TenantId.value
      addForm.value.tenantId = TenantId.value
   }
}, { deep: true, immediate: true });

watch(() => props.tenantId, (newVal) => {
   // console.log("tenantId", TenantId.value);
   // console.log('props.tenantId changed:', toRaw(newVal));
   TenantId.value = toRaw(newVal);
   // console.log('tenantId updated:', TenantId.value);
}, { deep: true, immediate: true });

function getOriginalData<T>(obj: T): T {
   // 如果 obj 不是对象，直接返回  
   if (obj === null || typeof obj !== 'object') {
      return obj;
   }

   // 使用 toRaw 获取原始对象  
   const rawObj = toRaw(obj);

   // 如果 rawObj 是 Proxy 对象，继续递归处理  
   if (rawObj !== obj) {
      return getOriginalData(rawObj);
   }

   // 处理嵌套对象  
   if (Array.isArray(rawObj)) {
      return rawObj.map(item => getOriginalData(item)) as unknown as T; // 处理数组  
   } else {
      const result: Record<string, any> = {}; // 创建一个新的对象  
      for (const key in rawObj) {
         if (rawObj.hasOwnProperty(key)) {
            result[key] = getOriginalData(rawObj[key]);
         }
      }
      return result as T; // 返回处理后的对象  
   }
}

// 用于提取原始数组的函数  
function flattenArray<T>(arr: T[]): T[] {
   return arr.reduce<T[]>((acc, item) => {
      if (Array.isArray(item)) {
         acc.push(...flattenArray(item)); // 递归处理嵌套数组  
      } else {
         acc.push(item);
      }
      return acc;
   }, []);
}

// 使用示例  
watch(() => props.jwtKeys, (newVal) => {
   if (newVal != null) {
      // console.log("JwtKeys", JwtKeys.value);
      const originalData = getOriginalData(newVal); // 递归获取原始数据  

      // 假设 originalData 是多层嵌套的数组，提取原始数组  
      const flattenedArray = flattenArray(originalData as any[]);

      // console.log('props.jwtKeys changed:', flattenedArray);

      // 将 newVal 多余的外层 proxy 去掉  
      JwtKeys.value = flattenedArray; // 更新为提取后的原始数组  
      // console.log('JwtKeys updated:', JwtKeys.value);
   }
}, { deep: true, immediate: true });

watch(() => props.jwtOpenConfig, (newVal) => {
   // console.log("JwtOpenConfig", JwtOpenConfig.value);
   // console.log('props.jwtOpenConfig changed:', toRaw(newVal));
   JwtOpenConfig.value = toRaw(newVal);
   // console.log('JwtOpenConfig updated:', JwtOpenConfig.value);
}, { deep: true, immediate: true });


const data = ref({
   id: '',
   deployType: 0,
   tenantId: '',
   azureTenantId: '',
   graphClientId: '',
   graphClientSecret: '',
   spaBindDomain: '',
   spaClientId: '',
   spaApiScopes: [],
   policies: {
      clientId: '',
      apiScopes: [],
      authorityDomain: '',
      names_signUpSignIn: '',
      names_editProfile: '',
      authorities_signUpSignIn_authority: '',
      authorities_editProfile_authority: '',
   },
   webApiClientId: '',
   webApiAud: '',
   isEnable: true,
   jwtKeys: [],
   jwtOpenConfig: {
      issuer: '',
      authorization_endpoint: '',
      token_endpoint: '',
      end_session_endpoint: '',
      jwks_uri: '',
      response_modes_supported: [],
      response_types_supported: [],
      scopes_supported: [],
      subject_types_supported: [],
      id_token_signing_alg_values_supported: [],
      token_endpoint_auth_methods_supported: [],
      claims_supported: [],
   },
   jwtKeysUrl: '',
   jwtOpenConfigUrl: ''
})

const update = () => {
   loading.value = true
   formRef.value?.validate((valid) => {
      if (valid) {
         formRef1.value?.validate((valid) => {
            if (valid) {
               formRef2.value?.validate((valid) => {
                  if (valid) {
                     formRef3.value?.validate((valid) => {
                        if (valid) {
                           data.value = {
                              id: EditForm.value.id,
                              deployType: 0,
                              tenantId: EditForm.value.tenantId,
                              azureTenantId: EditForm.value.azureTenantId,
                              graphClientId: EditForm.value.graphClientId,
                              graphClientSecret: EditForm.value.graphClientSecret,
                              spaBindDomain: EditForm.value.spaBindDomain,
                              spaClientId: EditForm.value.spaClientId,
                              spaApiScopes: EditForm.value.spaApiScopes,
                              policies: {
                                 clientId: EditForm.value.policies.clientId,
                                 apiScopes: EditForm.value.policies.apiScopes,
                                 authorityDomain: EditForm.value.policies.authorityDomain,
                                 names_signUpSignIn: EditForm.value.policies.names_signUpSignIn,
                                 names_editProfile: EditForm.value.policies.names_editProfile,
                                 authorities_signUpSignIn_authority: EditForm.value.policies.authorities_signUpSignIn_authority,
                                 authorities_editProfile_authority: EditForm.value.policies.authorities_editProfile_authority,
                              },
                              webApiClientId: EditForm.value.webApiClientId,
                              webApiAud: EditForm.value.webApiAud,
                              isEnable: EditForm.value.isEnable,
                              // @ts-ignore
                              jwtKeys: JwtKeys.value,
                              jwtOpenConfig: JwtOpenConfig.value,
                              jwtKeysUrl: EditForm.value.jwtKeysUrl,
                              jwtOpenConfigUrl: EditForm.value.jwtOpenConfigUrl,
                           }

                           if (!Array.isArray(data.value.jwtKeys)) {
                              data.value.jwtKeys = [data.value.jwtKeys];
                           }
                           ElMessage.success('表单提交成功!');
                           loading.value = false;
                           UpdateAccessProvider(JSON.stringify(data.value));

                        }
                     })
                  }
               })
            }
         })

      } else {
         ElMessage.error('请填写输入框!');
      }
      return;
   });
}

const add = () => {
   loading.value = true;
   addFormRef.value?.validate((valid) => {
      if (valid) {
         addFormRef1.value?.validate((valid) => {
            if (valid) {
               addFormRef2.value?.validate((valid) => {
                  if (valid) {
                     addFormRef3.value?.validate((valid) => {
                        if (valid) {
                           data.value = {
                              id: addForm.value.id,
                              deployType: 0,
                              tenantId: addForm.value.tenantId,
                              azureTenantId: addForm.value.azureTenantId,
                              graphClientId: addForm.value.graphClientId,
                              graphClientSecret: addForm.value.graphClientSecret,
                              spaBindDomain: addForm.value.spaBindDomain,
                              spaClientId: addForm.value.spaClientId,
                              spaApiScopes: Array.isArray(addForm.value.spaApiScopes) ? addForm.value.spaApiScopes : [addForm.value.spaApiScopes],
                              policies: {
                                 clientId: addForm.value.policies.clientId,
                                 apiScopes: Array.isArray(addForm.value.policies.apiScopes) ? addForm.value.policies.apiScopes : [addForm.value.policies.apiScopes],
                                 authorityDomain: addForm.value.policies.authorityDomain,
                                 names_signUpSignIn: addForm.value.policies.names_signUpSignIn,
                                 names_editProfile: addForm.value.policies.names_editProfile,
                                 authorities_signUpSignIn_authority: addForm.value.policies.authorities_signUpSignIn_authority,
                                 authorities_editProfile_authority: addForm.value.policies.authorities_editProfile_authority,
                              },
                              webApiClientId: addForm.value.webApiClientId,
                              webApiAud: addForm.value.webApiAud,
                              isEnable: addForm.value.isEnable,
                              // @ts-ignore
                              jwtKeys: null,
                              // @ts-ignore
                              jwtOpenConfig: null,
                              jwtKeysUrl: addForm.value.jwtKeysUrl,
                              jwtOpenConfigUrl: addForm.value.jwtOpenConfigUrl,
                           }
                           // 将addForm.value.policies.apiScopes和addForm.value.spaApiScopes转为数组
                           loading.value = false;
                           AddAccessProvider(JSON.stringify(data.value));

                        }
                     })
                  }
               })
            }
         })
      } else {
         ElMessage.error('请填写输入框!');
      }
      return;
   });
}

const cancelEditForm = () => {
   // 处理表单取消逻辑
   // showForm.value = false
   // 清空表单
   EditForm.value = {
      azureTenantId: '',
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
      jwtKeysUrl: '',
      jwtOpenConfigUrl: '',
   }

}

const cancelAddForm = () => {
   addForm.value = {
      azureTenantId: '',
      category: '',
      graphClientId: '',
      graphClientSecret: '',
      isEnable: true,
      id: TenantId.value,
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
      tenantId: TenantId.value,
      webApiAud: '',
      webApiClientId: '',
      jwtKeysUrl: '',
      jwtOpenConfigUrl: '',
   }
}

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getNewJwtKeys", "getNewJwtOpenConfig"])

// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transNewJwtKeys = () => {
   ElMessage.success('保存成功')
   emit("getNewJwtKeys", JwtKeys.value)
   emit("getNewJwtOpenConfig", JwtOpenConfig.value)
}

const AddAccessProvider = (data: any) => {
   loading.value = true;
   addAccessProvider(data).then(response => {
      // console.log(response);
      // 在这里执行你的操作
      // 将response.data赋值给form
      if (response.status == 200) {
         loading.value = false;
         ElMessage.success('新增成功');
         // 重新获取数据
         IsAdd.value = false
         // console.log("00000000000000000000000000000");
         // console.log(IsAdd.value);
         GetAccessProvider(JSON.parse(data).tenantId);

         addForm.value = {
            azureTenantId: '',
            category: '',
            graphClientId: '',
            graphClientSecret: '',
            isEnable: true,
            id: TenantId.value,
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
            tenantId: TenantId.value,
            webApiAud: '',
            webApiClientId: '',
            jwtKeysUrl: '',
            jwtOpenConfigUrl: '',
         }

      } else {
         loading.value = false;
         ElMessage.error('新增失败');
      }
   }).catch(error => {
      console.log(error);
   }).finally(() => {
      loading.value = false;
   })
}

const UpdateAccessProvider = (data: any) => {
   loading.value = true;
   updateAccessProvider(data).then(response => {
      // console.log(response);
      // 在这里执行你的操作
      // 将response.data赋值给form
      if (response.status == 200) {
         loading.value = false;
         ElMessage.success('修改成功');
         // 重新获取数据
         GetAccessProvider(JSON.parse(data).tenantId);
      } else {
         loading.value = false;
         ElMessage.error('修改失败');
      }
   }).catch(error => {
      loading.value = false;
      ElMessage.error('修改失败');
      setTimeout(() => {
         location.reload();
      }, 1000);
      console.log(error);
   }).finally(() => {
      loading.value = false;
   })
}

const GetAccessProvider = (tenantId: string) => {
   getAccessProvider(tenantId).then(response => {
      // 当新增完后执行此方法，理应有值
      if (response.data != null) {
         JwtKeys.value = response.data.jwtKeys
         JwtOpenConfig.value = response.data.jwtOpenConfig
         delete response.data.jwtKeys
         delete response.data.jwtOpenConfig
         EditForm.value = response.data
         transNewJwtKeys();
      } else {
         ElMessage.error('获取失败，新增有误');
      }
   }).catch(error => {
      console.log('There was a problem with your fetch operation:', error);
      // 在这里处理错误
   });
}

</script>

<style scoped></style>